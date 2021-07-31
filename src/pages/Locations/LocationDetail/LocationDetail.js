import React from 'react';
import NotFoundPage from '../../NotFoundPage';
import { useState } from 'react';
import { useEffect } from 'react';
import './LocationDetail.css';
import { Link } from 'react-router-dom';

const LocationDetail = ({ match }) => {
    const id = match.params.id;

    const [locationInfo, setLocationInfo] = useState({
        locationId: 0,
        locationName: '',
        address: '',
        city: '',
        province: '',
        postalCode: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://localhost:44349/api/HVACEquipmentLocations/${id}`);
            const body = await result.json();
            setLocationInfo(body);
        };
        fetchData();
    }, [id]);

    if (!locationInfo || locationInfo === null) return <NotFoundPage />

    return (
        <React.Fragment>
            <div className="detailPageContainer">
                <h4 className="text-info">{locationInfo.locationId}. {locationInfo.locationName}</h4>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="First group">
                        <Link key={locationInfo.locationId} to={`/editLocation/${locationInfo.locationId}`}>
                            <button
                                style={{ position: "block" }}
                                className="btn btn-primary"
                                type='button'
                                text='Edit Profile'
                            >Edit Location</button>
                        </Link>
                    </div>
                </div>
                <table style={{ "width": "90%", "margin": "auto" }}>
                    <tbody>
                        <tr>
                            <td style={{ "width": "65%", "verticalAlign": "top" }}>
                                <p><b>Address: </b>{locationInfo.address}</p>
                                <p><b>City: </b>{locationInfo.city}</p>
                                <p><b>Province: </b>{locationInfo.province}</p>
                                <p><b>Postal Code: </b>{locationInfo.postalCode}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment >
    );
}
export default LocationDetail;
