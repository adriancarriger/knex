const config = require('../../config/twilio-config');
const client = require('twilio')(config.accountSid, config.authToken);

function getMessages() {
  return new Promise((resolve, reject) => {
    client.messages.list((error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}

module.exports = {
  getMessages
};
