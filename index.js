#!/usr/bin/env node
let axios = require('axios');
const chalk = require('chalk');

// Retrieving email address from terminal user
if (process.argv[2] == null) {console.log('Please enter a valid email address after testouille to check for breaches.')}
else {
let input_email = process.argv[2];

// Validating email format
let validator = require("email-validator");
let validated = validator.validate(input_email);

//  Format response to user
let validated_response = '';
if (validated) {
    validated_response = 'This is a valid email address format. Well done ! ;)';
} else {
    validated_response = 'This is not a valid email address format. Try harder.';
}
console.log(validated_response);

// Axios request to haveibeenpwned.com

    // Config
let url = `https://haveibeenpwned.com/api/v2/breachedaccount/${input_email}`;
let headers = {'api-version': '2', 'user-agent': 'Oufti'};

    // Request and response
if (validated) {
    console.log(`Requesting to: ${url}`);
    axios.get(`${url}`, {headers: headers})
    .then(function (response) {
              console.log(`Connecting to server: okay (status code ${response.status})`);
              const breaches=response.data.map(({Name}) => Name);
              console.log(chalk.bgRed(`Your email address has been breached from databases of: ${breaches.join("\n")}`))
      })
    .catch(function (error) {
        if (error.response) {
            console.log(chalk.bgGreen('Great news! It looks like your email address has not been breached.'));
        } else if (error = 429) {
            console.log('You are either making too many requests or your are disconnected. Wait for a bit, check your connection and try again.');
        } else {
            console.log('An unknown error has occured, and this is highly embarrassing.');
        }
    })
}
}
