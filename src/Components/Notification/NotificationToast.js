import React from 'react';
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

/* Component to display donation toast notifications
 * Props: name, donation, message, currency, id
 */
function NotificationToast(props) {
    const [show, setShow] = useState(true);
    const toggleShow = () => setShow(!show);

  return (
    <Toast show={show} onClose={toggleShow} delay={5000} autohide>
        <Toast.Header>
            <strong className="me-auto">{props.name}</strong>
        </Toast.Header>
        <Toast.Body>
            Donated {props.currency}{props.donation} - {props.message}
        </Toast.Body>
    </Toast>
  )
}

export default NotificationToast;