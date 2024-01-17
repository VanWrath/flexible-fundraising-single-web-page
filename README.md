# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Deploy with Cloudflare

Deploy with 'npm run pages:deploy'
You may also follow the instructions from cloudflare on how to deploy this react app here: [https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/)

### To Update Title and Favicon
 In the public folder, open up 'index.html' file.
 On line 5, you can change the favicon in the Link tag. just replace the url in the href of the icon you want.
 You may also upload your own favicon in the public folder and link that.

 You can change the title of the webpage on line 27 in the title tag.

 ### Updating the page content

You may updte the content of the page to suit your campaign. You can do this in the 'src/data/data.json' directory.
Once you have opened the data.json file, you may edit the variables following the JSON format. Editing these variables will update the page content to your liking.

You may add any number of questions in the questions array and it will all be displayed on the page. just make sure your questions are in the following format:

```json
{
    "question": "Question 1?",
    "answer": "Answer 1."
}
```

You may also edit the rewards in "donationRewards" array.

## Connecting to external APIs

If you need to fetch data from an external API, you may do so using the fetch block in line 29.

## Handling form submissions

There is a user form that takes in a user's email. This can be found in 'src/Components/UserForm.js'. You can edit the code on how to handle the email submission in the 'handleSumbit' function.

## Stripe integration

Comming soon...