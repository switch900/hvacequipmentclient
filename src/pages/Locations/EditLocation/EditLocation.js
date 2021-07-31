import React, { useState } from 'react';
import { useEffect } from 'react';
import './EditLocation.css';

const EditLocation = ({ match }) => {

    const id = match.params.id;

    const [location, setLocation] = useState(
        {
            locationId: 0,
            locationName: '',
            address: '',
            city: '',
            province: '',
            postalCode: ''
        }
    );

    useEffect(() => {
        const addLocations = async () => {
            const result = await fetch(`https://localhost:44349/api/HVACEquipmentLocations/` + id);
            const body = await result.json();
            setLocation(body);
        };
        addLocations();
    }, [id]);

    const myChangeHandler = event => {
        const { name, value } = event.target
        setLocation({ ...location, [name]: value })
    }

    const updateLocation = async () => {
        const result = await fetch(`https://localhost:44349/api/HVACEquipmentLocations/` + id, {
            method: 'put',
            body: JSON.stringify({
                locationId: location.locationId,
                locationName: location.locationName,
                address: location.address,
                city: location.city,
                province: location.province,
                postalCode: location.postalCode
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
                    <input
                        className="form-control"
                        type="text"
                        name="locationName"
                        defaultValue={location.locationName}
                        onChange={myChangeHandler} />
                    <p>Address:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="address"
                        defaultValue={location.address}
                        onChange={myChangeHandler} />
                    <p>City:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="city"
                        defaultValue={location.city}
                        onChange={myChangeHandler} />
                    <p>Province:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="province"
                        defaultValue={location.province}
                        onChange={myChangeHandler} />
                    <p>Postal Code:</p>
                    <input
                        className="form-control"
                        type="text"
                        name="postalCode"
                        defaultValue={location.postalCode}
                        onChange={myChangeHandler} />
                </div>
                <button onClick={() => updateLocation()} className="btn btn-success" >Save</button>
            </form>
        </div>
    </React.Fragment >
    )
}
export default EditLocation;
