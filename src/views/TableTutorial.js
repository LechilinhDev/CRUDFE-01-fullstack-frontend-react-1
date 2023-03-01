
import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

class TableTutorial extends React.Component {
    // state = {
    //     data: []
    // }
    // async componentDidMount() {
    //     const data = await axios.get('http://localhost:8118/api/tutorials/');
    //     this.setState({
    //         data: data && data.data ? data.data : []
    //     })
    // }


    handleDelete = async (id) => {

        const { getListTutorials } = this.props;

        if (window.confirm(`Are you sure to delete this tutorial, id = ${id}`)) {
            await axios.delete(process.env.REACT_APP_BASE_URL + `${id}`);

        }
        getListTutorials();
    }
    // handleUpdate = (item) => {
    //     console.log('Update Data', item)
    // }

    render() {
        // let { data } = this.state
        let { listTutorials, handleEdit } = this.props;


        return (

            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Published</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {listTutorials.map((item, index) => {
                        return (

                            <tr key={item.id} >
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{"" + item.published}</td>
                                <td>
                                    <button
                                        className='btn btn-warning mx-3 d-inline-block'
                                        onClick={() => {
                                            this.props.handleShow();
                                            this.props.setAction();
                                            // this.handleUpdate(item);
                                            handleEdit(item);
                                        }}

                                    >
                                        Edit
                                    </button>
                                    <button className='btn btn-danger' onClick={() => this.handleDelete(item.id)} >Delete</button>
                                </td>
                            </tr>
                        )


                    })}





                </tbody>
            </Table>
        )
    }
}

export default TableTutorial;