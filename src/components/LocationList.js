import React, { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './ListStyle.css'

const LocationList = (exceptId) => {
    const [locationInfo, setLocationInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://localhost:44349/api/HVACEquipmentLocations`);
            const body = await result.json();
            setLocationInfo(body);
        }
        fetchData();
    }, []);

    var others = locationInfo;

    if (exceptId !== undefined) {
        others = Object.values(locationInfo).filter(p => p.locationId !== exceptId.exceptId);
    }

    const handleRemoveItem = async (locationId) => {
        const url = 'https://andrewhewitson.com/api/HVACEquipmentLocations/' + locationId;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });
        alert("you deleted equipment ID# " + locationId);
        const tmp = others.filter(u => u.locationId !== locationId);
        setLocationInfo(tmp);
    }

    const history = useHistory();

    const handleOnClick = useCallback((id) => history.push(`/locationDetail/${id}`), [history]);

    return (
        <>
            <div className="List">
                <Link to="/addLocation">
                    <button
                        type="button"
                        className="btn btn-success"
                    >
                        Add New Location
                    </button>
                </Link>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Location ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Province</th>
                            <th>Postal Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {others.map((item, key) => (
                            <tr key={item.locationId}
                                onClick={() => handleOnClick(item.locationId)}

                            >
                                <td>
                                    {item.locationId}
                                </td>
                                <td>
                                    {item.locationName}
                                </td>
                                <td>
                                    {item.address}
                                </td>
                                <td>
                                    {item.city}
                                </td>
                                <td>
                                    {item.province}
                                </td>
                                <td>
                                    {item.postalCode}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveItem(item.locationId)}>
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

export default LocationList;
