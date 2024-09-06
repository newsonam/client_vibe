import { useState } from "react";
// import axios from 'axios';
import './style.css';
import { useNavigate } from "react-router-dom";
import ErrorNotice from "./ErrorNotice";

function CreateEmp() {
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
    const postData = async (e) => {
        e.preventDefault();
        const { id, name, position, salary } = data;
        const response = await fetch('/api/employees', {
            method: "Post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id, name, position, salary })
        })
        const resultStatus = await response.status;
        if (resultStatus === 201) {
            setError('data saved successfully');
            navigate('/show');
        }
        else {
            setError('plz fill the data successfully');
            setData({});
        }
    }



    return (
        <div className="create-wrapper">

            <form method="post" className="create-form">
                <h1 className="mt-5 mb-5 create-text">Add Employee</h1>
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
                <button type="submit" name="submit" value="submit" className="btn btn-primary" onClick={postData} >POST</button>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            </form>


        </div>
    );
}

export default CreateEmp;
