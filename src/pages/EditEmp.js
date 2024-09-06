import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ErrorNotice from "./ErrorNotice";

import './style.css';


function EditEmp() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [data, setData] = useState({
        id: '',
        name: '',
        position: '',
        salary: ''
    })
    const [error, setError] = useState();

    const handleInputs = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }
    useEffect(() => {
        const getTaskData = async () => {
            const response = await fetch(`/editdata/${id}`);
            const data = await response.json();
            setData({
                ...data,
                id: data.data.id,
                name: data.data.name,
                position: data.data.position,
                salary: data.data.salary,

            });
        }

        getTaskData();
    }, [id]);

    const updateData = async (e,eid) => {
        e.preventDefault();
        const { id, name, position, salary } = data
        const response = await fetch(`/update/${eid}`, {
            method: 'Post',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id, name, position, salary })
        })
        const resultStatus = await response.status;
        if (resultStatus === 201) {
            setError("data updated");
            alert('data updated');
            navigate('/show');
        }
        else {
            setError("error");
        }
    }

    return (
        <div className="create-wrapper">

            <form className="edit-form">
                <h1 className=" mt-5 mb-4 edit-text">Edit Employee</h1>
                <div className="mb-3 text-left">
                    <label for="exampleInputTitle" className="form-label d-flex justify-content-start">Id</label>
                    <input type="text" name="id" className="form-control" id="exampleInputTitle" aria-describedby="emailHelp" value={data.id} onChange={handleInputs} />
                </div>
                <div className="mb-3 text-left">
                    <label for="exampleInputDesc" className="form-label d-flex justify-content-start">Name</label>
                    <input type="text" name="name" className="form-control" id="exampleInputDesc" aria-describedby="emailHelp" value={data.name} onChange={handleInputs} />
                </div>
                <div className="mb-3 text-left">
                    <label for="exampleInputDate" className="form-label d-flex justify-content-start">Position</label>
                    <input type="text" name="position" className="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={data.position} onChange={handleInputs} />

                </div>
                <div className="mb-3  text-left">
                    <label for="exampleInputStatus" className="form-label d-flex justify-content-start">Salary</label>
                    <input type="text" name="salary" className="form-control" id="exampleInputTitle" aria-describedby="emailHelp" value={data.salary} onChange={handleInputs} />
                </div>
                <button className="btn btn-primary" onClick={(e) => updateData(e,id)} >UPDATE</button>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}

            </form>
        </div>
    );
}

export default EditEmp;
