import React, { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import './AddEquipmentForm.css'

const AddEquipmentForm = ({ setEquipmentInfo }) => {

    const [name, setName] = useState('');
    const [locations, setLocations] = useState([]);
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
            const result = await fetch(`https://andrewhewitson.com/api/HVACEquipmentLocations`);
            const body = await result.json();
            setLocations(body);

        };
        addLocations();
    }, []);


    const onchangeSelect = (item) => {
        setLocation(item);
    };

    const addEquipment = async () => {
        const result = await fetch(`https://andrewhewitson.com/api/HVACEquipments`, {
            method: 'post',
            body: JSON.stringify({
                name: name,
                locationId: location.locationId
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
                    <p>Name:</p>
                    <input className="form-control" type="text" placeholder="Name"
                        value={name} onChange={(event) => setName(event.target.value)} />
                    <p>Location:</p>
                    <Select
                        value={location}
                        onChange={onchangeSelect}
                        options={locations}
                        getOptionLabel={({ locationName }) => locationName}
                    />
                </div>
                <button onClick={() => addEquipment()} className="btn btn-success" >Add</button>
            </form>
        </div>
    </React.Fragment >
    )
}
export default AddEquipmentForm;
