import React from 'react';
import NotFoundPage from '../../NotFoundPage';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './EquipmentDetail.css';

const EquipmentDetail = ({ match }) => {
    const id = match.params.id;

    const [equipmentInfo, setEquipmentInfo] = useState({
        id: 0,
        name: '',
        location: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://localhost:44349/api/HVACEquipments/${id}`);
            const body = await result.json();
            setEquipmentInfo(body);
        };
        fetchData();
    }, [id]);

    if (!equipmentInfo || equipmentInfo === null) return <NotFoundPage />

    return (
        <React.Fragment>
            <div className="detailPageContainer">
                <h4 className="text-info">{equipmentInfo.equipmentId}. {equipmentInfo.name}</h4>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="First group">
                        <Link key={equipmentInfo.equipmentId} to={`/editEquipment/${equipmentInfo.equipmentId}`}>
                            <button
                                style={{ position: "block" }}
                                className="btn btn-primary"
                                type='button'
                                text='Edit Profile'
                            >Edit Profile</button>
                        </Link>
                    </div>
                </div>
                < table style={{ "width": "90%", "margin": "auto" }}>
                    <tbody>
                        <tr>
                            <td style={{ "width": "65%", "verticalAlign": "top" }}>
                                <p><b>Location: {equipmentInfo.location.locationName}</b></p>
                                <p><b>Address: </b>{equipmentInfo.location.address}</p>
                                <p><b>City: </b>{equipmentInfo.location.city}</p>
                                <p><b>Province: </b>{equipmentInfo.location.province}</p>
                                <p><b>Postal Code: </b>{equipmentInfo.location.postalCode}</p>
                            </td>
                        </tr>
                    </tbody>
                </table >
            </div >
        </React.Fragment >
    );
}
export default EquipmentDetail;
