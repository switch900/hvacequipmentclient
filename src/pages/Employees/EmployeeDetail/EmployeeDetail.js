import React from 'react';
import NotFoundPage from '../../NotFoundPage';
import { useState } from 'react';
import { useEffect } from 'react';
import './EmployeeDetail.css';
import { Link } from 'react-router-dom';
import { authenticationService } from '../../../_services/authentication.service';

const EmployeeDetail = ({ match }) => {
    const id = match.params.id;

    const [employeeInfo, setEmployeeInfo] = useState({
        employeeId: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        accessLevel: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = authenticationService.currentUserValue;
            const result = await fetch(`https://andrewhewitson.com/api/employees/${id}`, {
                method: 'get',
                headers: new Headers({
                    "Accept": "application/json",
                    "Authorization": "Bearer " + currentUser.token
                })
            });
            const body = await result.json();
            setEmployeeInfo(body);
        };
        fetchData();
    }, [id]);



    if (!employeeInfo || employeeInfo === null) return <NotFoundPage />

    return (
        <React.Fragment>
            <div className="detailPageContainer">
                <h4 className="text-info">{employeeInfo.id}. {employeeInfo.firstName} {employeeInfo.lastName}</h4>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="First group">
                        <Link key={employeeInfo.id} to={`/editEmployee/${employeeInfo.id}`}>
                            <button
                                style={{ position: "block" }}
                                className="btn btn-primary"
                                type='button'
                                text='Edit Profile'
                            >Edit Employee</button>
                        </Link>
                    </div>
                </div>
                <table style={{ "width": "90%", "margin": "auto" }}>
                    <tbody>
                        <tr>
                            <td style={{ "width": "65%", "verticalAlign": "top" }}>
                                <p><b>Email:</b> {employeeInfo.email}</p>
                                <p><b>Phone Number: </b>{employeeInfo.phoneNumber}</p>
                                <p><b>Access Level: </b>{employeeInfo.accessLevel}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </React.Fragment >
    );
}
export default EmployeeDetail;
