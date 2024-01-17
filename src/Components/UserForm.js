import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/*Component to display final Q&A section with email prompt
 * props: description
 */
function UserForm(props) {
  const [validated, setValidated] = useState(false);
  const[email, setEmail] = useState();

  //handles email form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    //handle email submission here *********************
    console.log("Email has been submitted: " + email);

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Text>
          {props.description}
        </Form.Text>
      </Form.Group>

      <Form.Group className='my-4' controlId="validationEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control required type="email" placeholder="Enter email"  onChange={(e) => setEmail(e.target.value)}/>
        <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
      </Form.Group>
      
      <Button variant="outline-dark" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default UserForm;