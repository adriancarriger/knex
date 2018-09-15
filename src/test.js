const {
  getMessages
} = require('./twilio/get-messages');

const collection = {};

getMessages().then((logs) => {
  logs.forEach((log) => {
    usesNumberEndingWith(log, '50');
  });
  console.log(collection);
})


function usesNumberEndingWith(log, number) {
  endsWithNumber(log.to, number) || endsWithNumber(log.from, number)
}

function endsWithNumber(number, endingDigits) {
  if (!number) {
    return false
  }
  if (number.endsWith(endingDigits)) {
    collection[number] = true;
  }
}
