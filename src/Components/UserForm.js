import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/*Component to display final Q&A section with email prompt
 * props: description
 */
function UserForm(props) {
  return (
    <Form>
      <Form.Group>
        <Form.Text>
          {props.description}
        </Form.Text>
      </Form.Group>

      <Form.Group className='my-4'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"/>
      </Form.Group>
      
      <Button variant="outline-dark" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default UserForm;