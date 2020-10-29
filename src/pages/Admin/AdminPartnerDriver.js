import React from 'react'
import { DriverListPartner } from '../../components/DriverListPartner'
import NavBar from '../../components/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useHistory } from 'react-router-dom'
export default function AdminPartnerDriver() {
    let { clientId } = useParams();
    const history = useHistory();

        return (
            <div>
                <NavBar/>
                <div className="admin-partner-driver-content">
                    <a className="admin-partner-return-button" onClick={() => history.goBack()}>
                        <FontAwesomeIcon icon={faAngleLeft}/>
                        Đối tác
                    </a>
                    <h1 className="admin-partner-driver-header">
                        Danh sách tài xế của công ty
                    </h1>
                    <DriverListPartner clientId={clientId}/>
                </div>
            </div>
        )
    
}
