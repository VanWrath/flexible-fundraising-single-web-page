import './App.css';
import { useState, useEffect } from 'react';
import data from './data/data.json';
import currencies from './data/currencies.json';
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
import Notification from './Components/Notification/Notification';

//loads font awesome library
library.add(fas);
const URL = data.donationDataApiUrl;
const stripeURL = data.stripePaymentLink;

function App() {
  //Variable state filled with Dummy Data from data.json.
  const [amountRaised, setAmountRaised] = useState(0)
  const [percent, setPercent] = useState(0);
  const [donations, setDonations] = useState(data.donations); //replace data.donations with data from an API to get live donations values.
  const [goal, setGoal] = useState(data.goal);
  const [intervalAmount, setIntervalAmount] = useState(data.amountRaised*0.05);
  const [remoteData, setRemoteData] = useState();
  const [donationAmount, setDonationAmount] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  /* Request API data. 
   * Update donations and amount raised dynamically.
   */
  useEffect( () => {
      let mounted = true;

      const checkApiData = setInterval(()=>{
        if(URL){
          fetch(URL)
          .then(response => {
            if(response.ok) {
              if(mounted) {
                return response.json();
              }
            }
          })
          .then(json => {
            if(json){
              /* Set data state here on page load
               * 
               */
              //setRemoteData(json);
              console.log(remoteData);
            }
          })
        }
        else{
          clearInterval(checkApiData);
        } 
      },2000); //interval set to 2 seconds (2000 ms)
      return () => {
        clearInterval(checkApiData);
        mounted = false;
      }
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

  //create a list of paragraphs for the description to render.
  const description = data.description.map((paragraph, index) => <p key={index}>{paragraph}</p>);
  
  //create list of question items to render
  const questions = data.questions.map((question, index) =>
    <CollapsibleComponent key={index} heading={question.question} body={question.answer}/>);
  
  //create list of rewards to render
  const rewards = data.donationRewards.map((reward, index) => <h4 key={index} className='my-3'>{reward}</h4>);

  //check for form validation and submit form
  const [validated,setValidated] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if(donationAmount > 0) {
      /************ Handle donation submit here ************/
      alert("Donated: " + donationAmount.toLocaleString("en-US",  {style:"currency", currency:selectedCurrency}) + " " + selectedCurrency );

      //input stripe payment link here.
      //window.location.href=stripeURL;
      setValidated(true);
    }
    
  };

  return (
    <div className="App container" style={{ minHeight: '240px' }}>
      <div>
        <Notification />
      </div>
      
      <Container fluid>
        <h1 className='m-5 text-center'>{data.title}</h1>
      <Row className='d-flex justify-content-between'>
        {/* Main Column*/}
        <Col md={7}>
          <Row >
            <Col>
              <h2>Description</h2>
              <hr/>
              {description}
              <hr/>
            </Col>

            <Row>  
              {/* Q&A section */}
              <Col className='pb-4'>
                <h3 className='my-3 p-2'>Frequently Asked Questions</h3>
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
              <h4>Raised: ${amountRaised.toLocaleString(undefined, {minimumFractionDigits:0})} of ${goal.toLocaleString(undefined, {minimumFractionDigits:0})}</h4>
              <ProgressBar now={percent} label={`${percent}%`} variant="success"/>
              <p>{donations} Donations</p>
     
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="donationValidation">
                  <Form.Label>Donation Amount</Form.Label>
                  <Row>
                    <Col sm={8}>
                      <Form.Control required type="number" placeholder="Enter amount" isValid={donationAmount > 0} isInvalid={donationAmount <= 0} onChange={(e) => setDonationAmount(e.target.value)}/>
                      <Form.Control.Feedback type="invalid">Please enter a positive number</Form.Control.Feedback>
                    </Col>

                    <Col sm={4}>
                      <Form.Select onChange={(e) => setSelectedCurrency(e.target.value)}>
                        {currencies.map( (c, index) => <option key={index} value={c.currency}>{c.currency}</option>)}
                      </Form.Select>
                    </Col>
                  </Row>
                  
                  
                </Form.Group>
                
                <Form.Group className='d-grid'>
                  <Button type="submit" variant='success' className='d-grid'>Donate Now</Button>
                </Form.Group>
              </Form>

            </Col>
          </Row>
          <Row>

            {/* Donation Rewards section */}
            <Col className='py-4'>
              <h3>Donation Rewards</h3>
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
