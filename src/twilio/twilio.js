const config = require('../../config/twilio-config');
const client = require('twilio')(config.accountSid, config.authToken);

const screen = require('../util/screen');

client.messages.list((err, data) => {
  console.log(data);
});
