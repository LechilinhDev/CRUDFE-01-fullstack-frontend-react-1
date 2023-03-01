import React from "react";
import { Modal, Button } from "react-bootstrap";
import TableTutorial from "./TableTutorial";
import axios from 'axios';

class Modalupsert extends React.Component {
    state = {
        show: false,
        tutorial:
        {
            id: "",
            title: "",
            description: "",
            published: ""
        },
        listTutorials: [],
        action: 'C'

    }
    getListTutorials = async () => {
        const data = await axios.get('http://localhost:8118/api/tutorials/');
        this.setState({
            listTutorials: data && data.data ? data.data : []
        })
    }
    async componentDidMount() {
        this.getListTutorials();
    }
    handleShow = () => {
        this.setState({
            show: !this.state.show
        })
    }
    handleClose = () => {
        this.setState({
            show: this.state.show ? false : true
        })
    }
    setAction = () => {
        this.setState({
            action: 'U'
        })
    }
    handleInputChange = (event) => {

        this.setState({
            tutorial: {
                ...this.state.tutorial,
                [event.target.name]: event.target.value


            }



        })

    }

    handleSubmit = async () => {

        let { tutorial, action } = this.state;
        if (action === 'C') {
            await axios.post('http://localhost:8118/api/tutorials/', { ...tutorial });
        } else {
            await axios.put(`http://localhost:8118/api/tutorials/${tutorial.id}`, { ...tutorial });
            // console.log('check id', tutorial.id); check id pass data child from parent
        }



        // this.setState({
        //     listTutorials: [...listTutorials, tutorial],
        //     tutorial: {
        //         id: "",
        //         title: "",
        //         description: "",
        //         published: ""
        //     }
        // })
        this.setState({
            tutorial:
            {
                id: "",
                title: "",
                description: "",
                published: ""
            }
        })
        this.getListTutorials();

        this.handleClose();


    }

    handleEdit = (item) => {
        this.setState({
            tutorial: item
        })
    }

    render() {
        let { show, tutorial, listTutorials, action } = this.state;
        return (
            <>
                <Button className="mb-3 mt-3" variant="primary" onClick={() => {
                    this.handleShow();
                    this.setState({
                        action: 'C'
                    })
                }}>
                    Create New User
                </Button>
                <Modal show={show} onHide={() => this.handleClose()}>
                    <Modal.Header>
                        {action === 'C' ? 'Create a new user' : 'Update the user'}
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-group">
                                <label>Title</label>
                                <input type={"text"}
                                    className="form-control"
                                    value={tutorial.title}
                                    name="title"
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Description</label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    value={tutorial.description}
                                    name="description"
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </div>
                            <div className='form-group'>
                                <label>Publish: </label>
                                <select
                                    className='form-control'
                                    value={tutorial.published}
                                    name={'published'}
                                    onChange={(event) => this.handleInputChange(event)}
                                >
                                    <option value={true}>true</option>
                                    <option value={false}>false</option>
                                </select>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handleSubmit()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <TableTutorial listTutorials={listTutorials} getListTutorials={this.getListTutorials} handleShow={this.handleShow} setAction={this.setAction} handleEdit={this.handleEdit} />
            </>
        )
    }
}

export default Modalupsert;