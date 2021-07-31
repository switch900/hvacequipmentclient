import React, { useState } from 'react';
import { useEffect } from 'react';
import './EditEmployee.css'

const EditEmployee = ({ match }) => {

    const id = match.params.id;

    const [employee, setEmployee] = useState(
        {
            employeeId: 0,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            accessLevel: ''
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://andrewhewitson.com/api/employees/${id}`);
            const body = await result.json();
            setEmployee(body);
        };
        fetchData();
    }, [id]);

    const myChangeHandler = event => {
        const { name, value } = event.target
        setEmployee({ ...employee, [name]: value })
    }

    const updateEmployee = async () => {
        const url = `https://andrewhewitson.com/api/employees/` + id;
        const result = await fetch(url, {
            method: 'put',
            body: JSON.stringify({
                employeeId: employee.employeeId,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                accessLevel: employee.accessLevel
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const body = await result.json();
        console.log(body);
    }

    return (<React.Fragment>
        <div className="panel panel-default">
            <h1>{employee.firstName} {employee.lastName}</h1>
            <form>
                <div className="form-group">
                    <p>First Name:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        defaultValue={employee.firstName}
                        onChange={myChangeHandler} />
                    <p>Last Name:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        defaultValue={employee.lastName}
                        onChange={myChangeHandler} />
                    <p>Email:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={employee.email}
                        onChange={myChangeHandler} />
                    <p>Phone Number:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="phoneNumber"
                        defaultValue={employee.phoneNumber}
                        onChange={myChangeHandler} />
                    <p>Access Level:</p>
                    <input
                        type="text"
                        defaultValue={employee.accessLevel}
                        className="form-control"
                        name="accessLevel"
                        onChange={myChangeHandler}
                    />

                </div>
                <button onClick={() => updateEmployee()} className="btn btn-success" >Save</button>
            </form>
        </div>
    </React.Fragment >
    )
}
export default EditEmployee;
