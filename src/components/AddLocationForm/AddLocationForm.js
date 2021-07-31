import React, { useState } from 'react';
import './AddLocationForm.css'

const AddLocationForm = ({ setLocationInfo }) => {

    const [locationName, setLocationName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const addLocation = async () => {
        const result = await fetch(`https://andrewhewitson.com/api/HVACEquipmentLocations`, {
            method: 'post',
            body: JSON.stringify({
                locationName: locationName,
                address: address,
                city: city,
                province: province,
                postalCode: postalCode
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
                    <p>Location Name:</p>
                    <input className="form-control" type="text" placeholder="Location Name"
                        value={locationName} onChange={(event) => setLocationName(event.target.value)} />
                    <p>Address:</p>
                    <input className="form-control" type="text" placeholder="Address"
                        value={address} onChange={(event) => setAddress(event.target.value)} />
                    <p>City:</p>
                    <input className="form-control" type="text" placeholder="City"
                        value={city} onChange={(event) => setCity(event.target.value)} />
                    <p>Province:</p>
                    <input className="form-control" type="text" placeholder="Province"
                        value={province} onChange={(event) => setProvince(event.target.value)} />
                    <p>Postal Code:</p>
                    <input className="form-control" type="text" placeholder="Postal Code"
                        value={postalCode} onChange={(event) => setPostalCode(event.target.value)} />

                </div>
                <button onClick={() => addLocation()} className="btn btn-success" >Add</button>
            </form>
        </div>
    </React.Fragment >
    )
}
export default AddLocationForm;
