import React from 'react';
import logo from '../images/logo.jpg';
import { Modal } from '../container/Modal';

export const NotAuthorize = () =>{
    return(
        <Modal>
            <div className="error">
                <img className="error-logo" draggable={false} src={logo} />
                <h1>You are not authorize to view this page</h1>
                <h2></h2>
            </div>
        </Modal>
    )
}