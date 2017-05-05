const config = require('./twilio-config');
const client = require('twilio')(config.accountSid, config.authToken);

const screen = require('./screen');

client.messages.list((err, data) => {
  console.log(data);
});
