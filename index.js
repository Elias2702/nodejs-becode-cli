let axios = require('axios');
// Retrieving email addresse
let input_email = 'elias227@gmail.com';

// Validating script
let validator = require("email-validator");

let validated = validator.validate(input_email);


//  Validating response to user
let validated_response = '';

if (validated) {
    validated_response = 'This is a valid email address format. Well done ! ;)';
} else {
    validated_response = 'This is not a valid email address format. Try harder.';
}
console.log(validated_response);

// Axios request to haveibeenpwned.com
let url = `https://haveibeenpwned.com/api/v2/breachedaccount/${input_email}`;
let headers = {'api-version': '2', 'user-agent': 'Hamilton'};


if (validated) {
    console.log(`Requesting to: ${url}`);
    axios.get(`${url}`,
      {headers: headers})
    .then(function (response) {
          if (response.status == 200) {
              console.log(`Connecting to server: okay (status code ${response.status})`);
              if (response.data[0] == null) {
                  console.log('Great news! It looks like your email address has not been breached.');
              } else {
                  console.log(`Your email address has been breached from databases of: ${response.data[0].Name}`);
            }
          }
    })
    .catch(function (error) {
        if (error = 404) {
            console.log('It seems the email address you submitted does not exist. You make no sense.');
        } else if (error = 429) {
            console.log('You are making too many requests. Wait for a bit and try again.');
        } else {
            console.log('An unknown error has occured, and this is highly embarrassing.');
        }
    })
}
