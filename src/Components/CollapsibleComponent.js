import React from 'react';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap';


/* Component to render collapsible questions.
 * Props: heading, body
 */
 function CollapsibleComponent(props) {
    const[open, setOpen] = useState(false);

  return (
    <div className='my-2 d-grid'>
      <Button className='border text-white d-flex justify-content-between ' size="lg" variant="secondary" onClick={() => setOpen(!open)}>
        {props.heading} {open ? <FontAwesomeIcon icon="fa-solid fa-chevron-up" /> : <FontAwesomeIcon icon="fa-solid fa-chevron-down" />}
      </Button>
        <Collapse in={open} className='p-3'>
            <div>{props.body}</div>
        </Collapse>
    </div>
  )
}

export default CollapsibleComponent;