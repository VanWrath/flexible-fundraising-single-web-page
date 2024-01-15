//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import data from './data/data.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CollapsibleComponent from './Components/CollapsibleComponent';
import UserForm from "./Components/UserForm";

function App() {
  //add a function that counts up the amount raised to show animation on page load.
  let percent = data.AmmountRaised/data.Goal*100;
  let donations = data.AmmountRaised.toLocaleString(undefined, {minimumFractionDigits:0});
  let goal = data.Goal.toLocaleString(undefined, {minimumFractionDigits:0});
  const questions = data.Questions.map(question =>
    <CollapsibleComponent heading={question.Question} body={question.Answer}/>);
  const [validated,setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if(form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

  return (

    <div className="App container">
      <Container fluid>
        <h1 className='App-title'>{data.title}</h1>
      <Row>
        {/* Main Column*/}
        <Col md={8}>
          <Row>
            <Col>
              <h2>Description</h2>
              <hr/>
              <p>{data.description}</p>
            </Col>
            <Row>
              <Col>
                <hr/>
                <h3 className='my-4'>Q&A</h3>
                {/*Load questions and answers here
                */
               questions}
                <CollapsibleComponent heading="Signup for our newsletter!" body={<UserForm description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>}/>
              </Col>
            </Row>
          </Row>
        </Col>
        
        {/*
        Fundraiser Column
        */}
        <Col md={4}>
          <Row>
            <Col className='fundraiser-component'>
              <h4>Raised: $ {donations} of {goal}</h4>
              <ProgressBar now={percent} label={`${percent}%`} variant="success"/>
              <p>{donations} Donations</p>
                    
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="donationValidation">
                  <Form.Label>Donation Amount</Form.Label>
                  <Form.Control required type="number" placeholder="Enter amount"/>
                  <Form.Control.Feedback type="invalid">Please enter a positive number</Form.Control.Feedback>
                </Form.Group>
                
                <Button type="submit" className='w-1000'>Donate Now</Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default App;
