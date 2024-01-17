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
import ToastContainer from 'react-bootstrap/ToastContainer';
import Notification from './Components/Notification';

//loads font awesome library
library.add(fas);

function App() {
  const [amountRaised, setAmountRaised] = useState(0)
  const [percent, setPercent] = useState(0);
  const [donations, setDonations] = useState(data.donations); //replace data.donations with data from an API to get live donations values.
  const [intervalAmount, setIntervalAmount] = useState(data.amountRaised*0.05);
  const [remoteData, setRemoteData] = useState();
  const [goal, setGoal] = useState(data.goal.toLocaleString(undefined, {minimumFractionDigits:0}));
  const[donationAmount, setDonationAmount] = useState();

  //request API adata
  useEffect( () => {
      let mounted = true;
      //input URL of API to get data
      fetch('https://shop-api-ak3u.onrender.com/product')
        .then(response => {
          if(response.ok) {
            if(mounted) {
              //set data
              return response.json();
            }
          }
        })
        .then(json => {
          if(json){
            setRemoteData(json[6].price);
            console.log(remoteData);
          }
          
        })
        
      return () => mounted = false;
  }, []);

  

  //interval to animate progress bar
    useEffect(() => {
      const updateDonationHandler = setInterval(() => {
        setAmountRaised(s => s + intervalAmount);
        setPercent(Math.round((amountRaised/data.goal)*100));
        if(amountRaised >= data.amountRaised){
          setAmountRaised(data.amountRaised);
          setPercent(Math.round((amountRaised/data.goal)*100));
          clearInterval(updateDonationHandler);
        }
      },50);
      return () => clearInterval(updateDonationHandler);
    }, [amountRaised, intervalAmount]);

  const description = data.description.map(paragraph => <p>{paragraph}</p>);
  
  //create list of question items to render
  const questions = data.questions.map(question =>
    <CollapsibleComponent heading={question.question} body={question.answer}/>);
  
  //create list of rewards to render
  const rewards = data.donationRewards.map(reward => <h4>{reward}</h4>);
  
  //check for form validation and submit form
  //need to check for negative values.
  const [validated,setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    console.log("Amount to doante: " + donationAmount);
    //Handle donation submit here ******************************
    
    setValidated(true);
  };


  return (
    <div className="App container" style={{ minHeight: '240px' }}>
      <div className='' >
      <ToastContainer className='p-3' position='top-start' style={{ zIndex: 1 }}>
        {/*Push new notifications in here when a new donation occurs. */}
        <Notification name="Tim" donation={10} message="Hello World! This is a toast message"/>
        <Notification name="Kevin" donation={20} message="Hello World! This is a toast message"/>
      </ToastContainer>
      </div>
      
      <Container fluid>
        <h1 className='m-5 text-center'>{data.title}</h1>
      <Row className='d-flex justify-content-between'>
        {/* Main Column*/}
        <Col md={8}>
          <Row>
            <Col>
              <h2>Description</h2>
              <hr/>
              <p>{description}</p>
              <hr/>
            </Col>

            <Row>  
              {/* Q&A section */}
              <Col>
                <h3 className='my-3 p-2'>Q&A</h3>
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
              <h4>Raised: ${amountRaised.toLocaleString(undefined, {minimumFractionDigits:0})} of ${goal}</h4>
              <ProgressBar now={percent} label={`${percent}%`} variant="success"/>
              <p>{donations} Donations</p>
                    
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="donationValidation">
                  <Form.Label>Donation Amount</Form.Label>
                  <Form.Control required type="number" placeholder="Enter amount" onChange={(e) => setDonationAmount(e.target.value)}/>
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
