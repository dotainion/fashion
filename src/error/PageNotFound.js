import React from "react";
import { Modal } from "../container/Modal";
import logo from '../images/logo.jpg';

export const PageNotFound = () =>{
    return(
        <Modal>
            <div className="error">
                <img draggable={false} src={logo} />
                <h1>Oops. Page not found.</h1>
                <h2>We're sorry, the page you requested could not be found. Please go back to the homepage or contact us.</h2>
            </div>
        </Modal>
    )
}