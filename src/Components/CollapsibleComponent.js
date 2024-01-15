import React from 'react';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

//takes in 2 props: heading, body
 function CollapsibleComponent(props) {
    const[open, setOpen] = useState(false);

  return (
    <div className='my-2'>
        <div onClick={() => setOpen(!open)}>
          <h5 className='border p-2 mb-0 bg-secondary text-white'>{props.heading}</h5>
          </div>
        <Collapse in={open} className='bg-secondary-subtle p-3'>
            <div>{props.body}</div>
        </Collapse>
    </div>
  )
}

export default CollapsibleComponent;