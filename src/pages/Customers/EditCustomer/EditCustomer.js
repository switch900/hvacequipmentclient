import React, { useState } from 'react';
import { useEffect } from 'react';
import './EditCustomer.css'

const EditCustomer = ({ match }) => {

    const id = match.params.id;

    const [customer, setCustomer] = useState(
        {
            customerId: 0,
            companyName: '',
            contactName: '',
            email: '',
            phoneNumber: '',
            address: ''
        }
    );

    useEffect(() => {
        const addCustomer = async () => {
            const result = await fetch(`https://andrewhewitson.com/api/HVACCustomers/${id}`);
            const body = await result.json();
            setCustomer(body);

        };
        addCustomer();
    }, [id]);


    const myChangeHandler = event => {
        const { name, value } = event.target
        setCustomer({ ...customer, [name]: value })
    }

    const updateCustomer = async () => {
        const result = await fetch(`https://andrewhewitson.com/api/HVACCustomers/${id}`, {
            method: 'put',
            body: JSON.stringify({
                customerId: customer.customerId,
                companyName: customer.companyName,
                contactName: customer.contactName,
                email: customer.email,
                phoneNumber: customer.phoneNumber,
                address: customer.address
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
            <form>
                <div className="form-group">
                    <p>Company Name:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="companyName"
                        defaultValue={customer.companyName}
                        onChange={myChangeHandler} />
                    <p>Contact Name:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="contactName"
                        defaultValue={customer.contactName}
                        onChange={myChangeHandler} />
                    <p>Email:</p>
                    <input
                        className="form-control"
                        type="text"
                        defaultValue={customer.email}
                        onChange={myChangeHandler} />
                    <p>Phone Number:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="phoneNumber"
                        defaultValue={customer.phoneNumber}
                        onChange={myChangeHandler} />
                    <p>Address:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="address"
                        defaultValue={customer.address}
                        onChange={myChangeHandler} />
                </div>
                <button onClick={() => updateCustomer()} className="btn btn-success" >Save</button>
            </form>
        </div>
    </React.Fragment >
    )
}
export default EditCustomer;
