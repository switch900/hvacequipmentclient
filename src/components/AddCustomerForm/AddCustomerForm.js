import React, { useState } from 'react';
import './AddCustomerForm.css'
import { authenticationService } from '../../_services/authentication.service';

const AddCustomerForm = ({ setCustomerInfo }) => {
    const [companyName, setCompanyName] = useState('');
    const [contactName, setContactName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const addCustomer = async () => {
        const currentUser = authenticationService.currentUserValue;

        const result = await fetch(`https://andrewhewitson.com/api/HVACCustomers`, {
            method: 'post',
            body: JSON.stringify({
                companyName: companyName,
                contactName: contactName,
                email: email,
                phoneNumber: phoneNumber,
                address: address
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + currentUser.token
            }
        });
        const body = await result.json();
        console.log(body);
    }

    return (<React.Fragment>
        <div className="panel panel-default">
            <form>
                <div className="form-group">
                    <label htmlFor="companyName">CompanyName:</label>
                    <input className="form-control" type="text" placeholder="Company Name"
                        value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="contactName">Contact Name:</label>
                    <input className="form-control" type="text" placeholder="Contact Name"
                        value={contactName} onChange={(event) => setContactName(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input className="form-control" type="text" placeholder="Email"
                        value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input className="form-control" type="text" placeholder="Phone Number"
                        value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input className="form-control" type="text" placeholder="Address"
                        value={address} onChange={(event) => setAddress(event.target.value)} />
                </div>
                <button onClick={() => addCustomer()} className="btn btn-success" >Add</button>
            </form>
        </div>
    </React.Fragment >
    )
}
export default AddCustomerForm;
