import React, { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './ListStyle.css'

const EquipmentList = (exceptId) => {
    const [equipmentInfo, setEquipmentInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://localhost:44349/api/HVACEquipments`);
            const body = await result.json();
            setEquipmentInfo(body);
        }
        fetchData();
    }, []);

    var others = equipmentInfo;

    if (exceptId !== undefined) {
        others = Object.values(equipmentInfo).filter(p => p.equipmentId !== exceptId.exceptId);
    }

    const handleRemoveItem = async (equipmentId) => {
        const url = 'https://andrewhewitson.com/api/HVACEquipments/' + equipmentId;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });
        alert("you deleted equipment ID# " + equipmentId);
        const tmp = others.filter(u => u.equipmentId !== equipmentId);
        setEquipmentInfo(tmp);
    }

    const history = useHistory();

    const handleOnClick = useCallback((id) => history.push(`/equipmentDetail/${id}`), [history]);

    return (
        <>
            <div className="List">
                <Link to="/addEquipment">
                    <button
                        type="button"
                        className="btn btn-success"
                    >
                        Add New Item
                    </button>
                </Link>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Equipment ID</th>
                            <th>Equipment Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {others.map((item, key) => (
                            <tr key={item.equipmentId}
                                onClick={() => handleOnClick(item.equipmentId)}
                            >
                                <td>
                                    {item.equipmentId}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.location.locationName}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveItem(item.equipmentId)}>
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

export default EquipmentList;
