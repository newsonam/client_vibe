import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './style.css';

function ShowEmp() {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const getEmpData = async () => {
            const response = await fetch('/api/employees');
            const data = await response.json();
            setData(data.data);
        }

        getEmpData();

    }, [refresh]);

    const deleteData = async (id) => {
        const response = await fetch(`/api/employees/${id}`, {
            method: 'delete'
        });
        const status = await response.status;
        if (status === 201) {
            window.alert("Employee data deleted");
            setRefresh(!refresh);

        }
        else {
            window.alert("error");
        }
    }
    return (
        <div className="show-wrapper">
            <h2 className="mt-5 font-bold pt-4">Employee Details</h2>

            <table className="container table table-info table-bordered w-75">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" className="w-25 ">Emp ID</th>
                        <th scope="col" className="w-25">Name</th>
                        <th scope="col" className="w-25">Position</th>
                        <th scope="col" className="w-25">Salary</th>
                        <th scope="col" className="w-25">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td key={item._id}>{item.id}</td>
                                <td key={item._id}>{item.name}</td>
                                <td key={item._id}>{item.position}</td>
                                <td key={item._id}>{item.salary}</td>
                                <td key={item._id}>
                                    <div className="d-flex gap-2 justify-content-center flex-shrink ">

                                        <Link
                                            to={`/edit/${item._id}`}

                                        >
                                            <button className="btn btn-primary">Edit</button>
                                        </Link>
                                        <button className="btn btn-primary" onClick={() => deleteData(item._id)}>Delete</button>
                                    </div>

                                </td>
                            </tr>
                        );
                    })}


                </tbody>
            </table>


        </div>
    );
}

export default ShowEmp;

