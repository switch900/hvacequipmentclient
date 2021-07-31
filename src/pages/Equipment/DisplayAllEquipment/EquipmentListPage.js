import React from 'react';
import EquipmentList from '../../../components/EquipmentList';
import './EquipmentListPage.css';

const EquipmentListPage = () => (
    <React.Fragment>
        <div className="listPageContainer">
            <h1>Display All Equipment</h1>
        </div>
        <EquipmentList />
    </React.Fragment>
);
export default EquipmentListPage;
