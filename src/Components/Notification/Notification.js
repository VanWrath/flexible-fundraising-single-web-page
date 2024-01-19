import React, { useEffect } from 'react';
import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import NotificationToast from './NotificationToast';
import data from '../../data/data.json';

//test Variables for notifications
let id = 0;
let amount = 10;

//update URL of your API
const URL = data.notificationApiUrl;

/* Component to contain notifications
 * Props: 
 */
function Notification() {
    const [notifications, setNotifications] = useState([
        { id: 0, name:"Tim", donation:10, currency:"$", message:"Hello World! This is a donation message." }
    ]);

    const addNotification = (id, name, donation, currency, message) => {
        let notifs = notifications.slice();
        notifs.push({
            id: id,
            name: name,
            donation: donation,
            currency: currency,
            message: message,
        });
        setNotifications(notifs);
    }
    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    }

    /* Integrate API notifications. 
     * You can adjust the interval time here to check for updates. Current interval is set to 2 seconds (2000 ms).
     */
    useEffect(() => {
        const apiInterval = setInterval(() => {
            if(URL !== "") {
                const fectchNotifications = async () => {
                    const result = await fetch(URL);
                    result.json().then(json => {
                        /* Handle incomming donation notification data from API. 
                         * This should add new data to the list of notifications and render a new toast component.
                         * NOT TESTED!!!
                         */
                        addNotification(json.id, json.name, json.donation, json.currency, json.message);
                    })
                  }
                  fectchNotifications();
            }
        }, 2000);
      
    
      return () => clearInterval(apiInterval);
    }, [])
    
    //Test Notifications. Delete this useEffect code block in production.
    useEffect(() => {
        const pustTestNotif = setInterval(() =>{
            if(id > 5){
                return clearInterval(pustTestNotif);
            }
            addNotification(++id, "Tim", amount+=10, "$", "Hello World! This is a donation message.");
        }, 4000);
      
      return () =>  clearInterval(pustTestNotif);
    }, [notifications]);
    

  return (
    <ToastContainer className='p-3' position='top-start' style={{ zIndex: 1 }}>
        {notifications.map((notif, index) => 
        <NotificationToast key={index} id={notif.id} 
        name={notif.name} 
        donation={notif.donation} 
        currency={notif.currency} 
        message={notif.message}
        onExit={deleteNotification}/>)}
    </ToastContainer>
  )
}

export default Notification;