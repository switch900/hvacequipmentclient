import React from 'react';
//import EquipmentList from '../components/EquipmentList';
import NotFoundPage from '../../NotFoundPage';
import { useState } from 'react';
import { useEffect } from 'react';
// import AddEquipmentForm from '../../../ components/AddEquipmentForm/AddEquipmentForm';
import './CustomerDetail.css';
import { Link } from 'react-router-dom';

const CustomerDetail = ({ match }) => {
    const id = match.params.id;

    const [customerInfo, setCustomerInfo] = useState({
        customerId: 0,
        companyName: '',
        contactName: '',
        email: '',
        phoneNumber: '',
        address: ''
    });

    const [isEditable, setIsEditable] = useState({
        isEditable: false
    })

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://andrewhewitson.com/api/HVACCustomers/${id}`);
            const body = await result.json();
            setCustomerInfo(body);
            setIsEditable(false);
        };
        fetchData();
    }, [id]);



    if (!customerInfo || customerInfo === null) return <NotFoundPage />

    // const handleRemoveItem = async (id) => {
    //     const url = 'https://localhost:44349/api/HVACEquipments/' + id;
    //     fetch(url, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: null
    //     });
    //     setCustomerInfo();
    // }

    const handleSaveItem = (id) => {
        setIsEditable(false);
        const url = 'https://andrewhewitson.com/api/HVACEquipments/' + id;
        console.log(url);
        fetch(url, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache",
                "Accept": "*/*",
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                // name: this.state.name,
                // location: this.state.location,
            })
        })
            .then(res => res.json()).then(res => {
                if (res) {
                    alert("You have updated customer");
                }
                else {
                    alert("Not valid information");
                }
            }, function (error) {
                console.log(error.message);
            })

    }

    // const handleEditClick = () => {
    //     setIsEditable(true)
    // }

    return (
        <React.Fragment>
            <div className="detailPageContainer">
                <h4 className="text-info">{customerInfo.customerId}. {customerInfo.companyName}</h4>

                {isEditable
                    ? (<div className="btn-group" role="group" aria-label="First group">
                        <button
                            type="button"
                            className="btn btn-succes"
                            onClick={() => handleSaveItem(customerInfo.equipmentId)}>
                            Save
                        </button>
                    </div>)
                    :
                    (<div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group" role="group" aria-label="First group">
                            <Link key={customerInfo.customerId} to={`/editCustomer/${customerInfo.customerId}`}>
                                <button
                                    style={{ position: "block" }}
                                    className="btn btn-primary"
                                    type='button'
                                    text='Edit Profile'
                                >Edit Customer</button>
                            </Link>
                        </div>
                        {/* <div className="btn-group" role="group" aria-label="Second group">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveItem(customerInfo.equipmentId)}>
                            Delete
                        </button>
                    </div> */}
                    </div>)
                }

                <table style={{ "width": "90%", "margin": "auto" }}>
                    <tbody>
                        <tr>
                            {/* <td style={{ "width": "15%", "verticalAlign": "top" }}>
                            <img className="rounded img-responsive pull-right img-thumbnail float-left"
                                style={{ "width": "50%" }}
                                src={`${customerInfo.pictureUrl}`} alt={`${customerInfo.firstName} ${customerInfo.lastName}`} />
                        </td> */}
                            <td style={{ "width": "65%", "verticalAlign": "top" }}>
                                <p><b>Contact Name: {customerInfo.contactName}</b></p>
                                <p><b>Email: </b>{customerInfo.email}</p>
                                <p><b>Phone Number: </b>{customerInfo.phoneNumber}</p>
                                <p><b>Address: </b>{customerInfo.address}</p>
                            </td>
                            {/* <td style={{ "width": "20%", "verticalAlign": "top" }}>
                            <h3>Others:</h3>
                            <EquipmentList exceptId={equipmentInfo.id} />
                        </td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <AddEquipmentForm id={id} setEquipmentInfo={setEquipmentInfo} /> */}
        </React.Fragment >
    );
}
export default CustomerDetail;
