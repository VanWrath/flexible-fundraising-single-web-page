# Flexible Fundraising React Web Page

## Table of contents
1. [Installation](#Installation)
2. [Configuration](#Configuration)
3. [Deployment](#Deployment)
4. [Hosted Demo](#Hosted Demo)

## Installation
This installation process expects you to already have node.js and npm installed.

1. Clone the repository: git clone `https://github.com/VanWrath/flexible-fundraising-single-web-page.git`
2. Navigate to the app directory in the terminal: cd flexible-fundraising-single-web-page
3. Install dependencies: npm install
4. Start the app: npm start

## Configuration

In this section, I will go over how to customize the content for the page to suit your needs.

### To Update Title and Favicon
 In the public folder, open up `public/index.html` file.
 On line 5, you can change the favicon in the Link tag. Just replace the url in the href with the icon you want.
 You may also upload your own favicon in the public folder and link that.

 You can change the title of the webpage on line 27 in the title tag.

 ### Updating the page content

You may update the content of the page to suit your campaign. You can do this in the `src/data/data.json` file. You can update fields such as the title, description, fundraising goal, questions and answers, donation rewards, and API url links.

Once you have opened the `data.json` file, you may edit the variables following the JSON format. Editing these variables will update the page content to your liking.

The description is in an array, where each element in the array is a paragraph. So you'll have to paste in your paragraphs in the array properly.

You may add any number of questions in the questions array and it will all be displayed on the page. just make sure your questions are in the following format:

```json
{
    "question": "Question 1?",
    "answer": "Answer 1."
}
```

You may also edit the rewards in "donationRewards" array.

### Connecting to external APIs

Just a disclaimer. API integration has NOT been tested to work. So integrating APIs may require more work.

#### Donation data

If you need to fetch data from an external API, you may do so by updating the `URL` variable on line 19 in the `/src/App.js` file. This URL link is used in the Fetch block on line 39 and is designed to make API calls in 2 second intervals to retreive donation data. This feature has not been tested and not guaranteed to work right away. 

Currently the donation data displayed is dummy data from `src/data/data.json`.

#### Notifications

When new donations are made, there should be an API request to get that data for recent donation notifications. You can update API URL in `src/data/data.json` with the "notificationApiUrl" field.

The notificaiton data will be used in the file `src/Components/Notification/Notification.js`. You will have to adjust how the API data is handled in the fetch function.

#### Handling form submissions

There is a user form that takes in a user's email. This can be found in `src/Components/UserForm.js`. You can edit the code on how to handle the email submission in the 'handleSumbit' function.

### Stripe integration

Stripe integration has not been test at all. I have added a field in `src/data/data.json` called "stripePaymentLink" to store the stripe payment link. This link is opened when the "Donate Now" button is clicked. You can modify the code if it doesn't work in the `src/App.js` file in the "handleSubmit" function on line 106.

## Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Deploy with Cloudflare

Deploy with 'npm run pages:deploy'

You may also follow the instructions from cloudflare on how to deploy this react app here: [https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/)

## Hosted Demo

This Demo is hosted on github pages.
[Demo](https://vanwrath.github.io/flexible-fundraising-single-web-page/)