import React, { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './ListStyle.css';
import { authenticationService } from '../_services/authentication.service';

const CustomerList = (exceptId) => {
    const [customerInfo, setCustomerInfo] = useState({});

    useEffect(() => {
        const url = 'https://andrewhewitson.com/api/HVACCustomers';
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
            setCustomerInfo(body);
        }
        fetchData();
    }, []);

    var others = customerInfo;

    if (exceptId !== undefined) {
        others = Object.values(customerInfo).filter(p => p.customerId !== exceptId.exceptId);
    }

    const handleRemoveItem = async (customerId) => {
        const url = 'https://localhost:44349/api/HVACCustomers' + customerId;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });
        alert("you deleted equipment ID# " + customerId);
        const tmp = others.filter(u => u.customerId !== customerId);
        setCustomerInfo(tmp);
    }

    const history = useHistory();

    const handleOnClick = useCallback((id) => history.push(`/customerDetail/${id}`), [history]);

    return (
        <>
            <div className="List">
                <Link to="/addCustomer">
                    <button
                        type="button"
                        className="btn btn-success"
                    >
                        Add New Customer
                    </button>
                </Link>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Company Name</th>
                            <th>Contact Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {others.map((item, key) => (
                            <tr key={item.customerId}
                                onClick={() => handleOnClick(item.customerId)}
                            >
                                <td>
                                    {item.customerId}
                                </td>
                                <td>
                                    {item.companyName}
                                </td>
                                <td>
                                    {item.contactName}
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>
                                    {item.phoneNumber}
                                </td>
                                <td>
                                    {item.address}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveItem(item.customerId)}>
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

export default CustomerList;
