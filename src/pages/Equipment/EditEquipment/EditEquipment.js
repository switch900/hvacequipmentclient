import React, { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import './EditEquipment.css'

const EditEquipment = ({ match }) => {

    const id = match.params.id;

    const [location, setLocation] = useState(
        {
            locationId: 0,
            locationName: ""
        }
    );
    const [locations, setLocations] = useState([]);
    const [equipment, setEquipment] = useState(
        {
            equipmentId: 0,
            name: '',
            locationId: ''
        }
    );

    useEffect(() => {
        const addEquipment = async () => {
            const result = await fetch(`https://localhost:44349/api/HVACEquipments/` + id);
            const body = await result.json();
            setEquipment(body);

        };
        addEquipment();
    }, [id]);

    useEffect(() => {
        const addLocation = async () => {
            const result = await fetch(`https://localhost:44349/api/HVACEquipmentLocations/` + equipment.locationId);
            const body = await result.json();
            setLocation(body);
        };
        addLocation();
    }, [equipment.locationId]);

    useEffect(() => {
        const addLocations = async () => {
            const result = await fetch(`https://localhost:44349/api/HVACEquipmentLocations`);
            const body = await result.json();
            setLocations(body);

        };
        addLocations();
    }, []);

    const myChangeHandler = event => {
        const { name, value } = event.target
        setEquipment({ ...equipment, [name]: value })
    }

    const onchangeSelect = (item) => {
        setLocation(item);
    };

    const addEquipment = async () => {
        const result = await fetch(`https://andrewhewitson.com/api/HVACEquipments/` + id, {
            method: 'put',
            body: JSON.stringify({
                equipmentId: equipment.equipmentId,
                name: equipment.name,
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
            <h1>{equipment.name}</h1>
            <form>
                <div className="form-group">
                    <p>Name:</p>
                    <input
                        className="form-control"
                        type="text"
                        defaultValue={equipment.name}
                        name="name"
                        onChange={myChangeHandler} />
                    <p>Location:</p>
                    <Select
                        placeholder={location.locationName}
                        defaultValue={location.locationName}
                        onChange={onchangeSelect}
                        name="locationName"
                        options={locations}
                        getOptionLabel={({ locationName }) => locationName}
                    />
                </div>
                <button onClick={() => addEquipment()} className="btn btn-success" >Save</button>
            </form>
        </div>
    </React.Fragment >
    )
}
export default EditEquipment;
