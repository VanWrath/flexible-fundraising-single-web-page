import React from 'react';
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

/* Component to display donation notifications
 * Props: name, donation, message
 */
function Notification(props) {
    const [show, setShow] = useState(true);
    const toggleShow = () => setShow(!show);

  return (
    <Toast show={show} onClose={toggleShow} delay={5000} autohide>
        <Toast.Header>
            <strong className="me-auto">{props.name}</strong>
        </Toast.Header>
        <Toast.Body>
            Donated ${props.donation} - {props.message}
        </Toast.Body>
    </Toast>
  )
}

export default Notification;