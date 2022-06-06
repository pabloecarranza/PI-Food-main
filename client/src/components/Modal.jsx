import React from "react";
import Styles from "../styles/Modal.module.css"


const Modal = ({show, message, setShow}) => {



    return(
        <div className={Styles.modal}>
            <div><h3>{message}</h3>
                 
            </div>
            <span onClick={e => setShow(false)}> x</span>
        </div>        
    )
}

export default Modal
//owo