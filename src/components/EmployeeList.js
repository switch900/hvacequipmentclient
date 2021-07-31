import React, { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ListStyle.css';
import { Link } from 'react-router-dom';
import { authenticationService } from '../_services/authentication.service';

const EmployeeList = (match) => {
    // const id = match.params.id;
    const [employeeInfo, setEmployeeInfo] = useState({});

    useEffect(() => {
        const url = 'https://andrewhewitson.com/api/employees';

        const fetchData = async () => {
            const currentUser = authenticationService.currentUserValue;
            const result = await fetch(url, {
                method: 'get',
                headers: new Headers({
                    "Accept": "application/json",
                    "Authorization": "Bearer " + currentUser.token
                })
            });
            const body = await result.json();
            setEmployeeInfo(body);
        }
        fetchData();
    }, []);


    var others = Object.values(employeeInfo);
    // if (exceptId !== undefined) {
    //     others = Object.values(employeeInfo).filter(p => p.employeeId !== exceptId.exceptId);
    // }

    const handleRemoveItem = async (Id) => {
        const currentUser = authenticationService.currentUserValue;
        const url = 'https://localhost:44349/api/employees/' + Id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + currentUser.token
            },
            body: null
        });
        alert("you deleted employee ID# " + Id);
        const tmp = others.filter(u => u.id !== Id);
        setEmployeeInfo(tmp);
    }

    const history = useHistory();

    const handleOnClick = useCallback((Id) => history.push(`/employeeDetail/${Id}`), [history]);

    return (
        <>
            <div className="List">
                <Link to="/addEmployee">
                    <button
                        type="button"
                        className="btn btn-success"
                    >
                        Add New Employee
                    </button>
                </Link>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Access Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {others.map((item, key) => (
                            <tr key={item.id}>
                                <td onClick={() => handleOnClick(item.id)}>
                                    {item.id}
                                </td>
                                <td>
                                    {item.firstName}
                                </td>
                                <td>
                                    {item.lastName}
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>
                                    {item.phoneNumber}
                                </td>
                                <td>
                                    {item.accessLevel}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveItem(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EmployeeList;
