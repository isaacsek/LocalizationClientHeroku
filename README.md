# Localization App made with React (for [Heroku](https://www.heroku.com/) deployment)

https://localization-client.herokuapp.com/

### UP & RUNNING (Local/Development)
* `npm install`
* `npm start`
* visit `http://localhost:8080/`

### DEPLOYING TO HEROKU
This app is set up for deployment to Heroku!

Heroku will follow the `postinstall` command in your `package.json` and compile assets with `webpack.prod.config.js`. It runs the Express web server in `server.js`. You'll notice there's a special section set up for running in development.

If you've never deployed a Node app to Heroku (or just need a refresher), they have a really great walkthrough [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).

### To Test:
- To test, you must have 2 speakers, one labeled "red" and the other "blue"
- Also, allow site access to camera and microphone
- Login with "user" : "password"
- Work in progress***
