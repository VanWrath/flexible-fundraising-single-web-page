import './App.css';
import { useState, useEffect } from 'react';
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {getData} from './Services/Http-Service';

//loads font awesome library
library.add(fas);

function App() {
  const [amountRaised, setAmountRaised] = useState(0)
  const [percent, setPercent] = useState(0);
  const [donations, setDonations] = useState(data.donations);
  const [intervalAmount, setIntervalAmount] = useState(data.ammountRaised*0.03)
  const [goal, setGoal] = useState(data.goal.toLocaleString(undefined, {minimumFractionDigits:0}));
  const [remoteData, setRemoteData] = useState([]);

  //request API adata
  useEffect( () => {
      let mounted = true;
      getData('https://shop-api-ak3u.onrender.com/product')
        .then(items => {
          if(mounted) {
            //set data
            setRemoteData(items)
          }
        })
        
      return () => mounted = false;
  }, []);

  //interval to animate progress bar
    useEffect(() => {
      const updateDonationHandler = setInterval(() => {
        setAmountRaised(s => s + intervalAmount);
        setPercent(Math.round((amountRaised/data.goal)*100));
        if(amountRaised >= data.ammountRaised){
          setAmountRaised(data.ammountRaised);
          setPercent(Math.round((amountRaised/data.goal)*100));
          clearInterval(updateDonationHandler);
        }
      },50);
      return () => clearInterval(updateDonationHandler);
    }, [amountRaised]);
  
    

  //create list of question items to render
  const questions = data.questions.map(question =>
    <CollapsibleComponent heading={question.question} body={question.answer}/>);
  
    //create list of rewards to render
  const rewards = data.donationRewards.map(reward => <h4>{reward}</h4>);
  
  //check for form validation and submit form
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
              <hr/>
            </Col>

            <Row>
              
              {/* Q&A section */}
              <Col>
                <h3 className='my-4'>Q&A</h3>
                {/* Load questions and answers here */
               questions}
                <CollapsibleComponent heading={data.finalQuestion.question} body={<UserForm description={data.finalQuestion.answer}/>}/>
              </Col>
            </Row>
          </Row>
        </Col>
        
        {/*
        Fundraiser Column
        */}
        <Col md={4}>
          <Row>
            {/*Donation Panel*/}
            <Col className='fundraiser-component p-4 bg-secondary-subtle'>
              <h4>Raised: $ {amountRaised.toLocaleString(undefined, {minimumFractionDigits:0})} of {goal}</h4>
              <ProgressBar now={percent} label={`${percent}%`} variant="success"/>
              <p>{donations} Donations</p>
                    
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="donationValidation">
                  <Form.Label>Donation Amount</Form.Label>
                  <Form.Control required type="number" placeholder="Enter amount"/>
                  <Form.Control.Feedback type="invalid">Please enter a positive number</Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className='d-grid'>
                  <Button type="submit" variant='success' className='d-grid'>Donate Now</Button>
                </Form.Group>
              </Form>

            </Col>
          </Row>
          <Row>

            {/* Donation Rewards section */}
            <Col className='p-4'>
              <h3>Donation Rewards</h3>
              <br/>
              {rewards}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default App;
