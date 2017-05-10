const prettyjson = require('prettyjson');

const screen = {
  clear: () => process.stdout.write('\033c'),
  write: (data, mode) => {
    let output = data;
    if (mode === 'json') {
      output = JSON.stringify(data, null, 4);
    } else if (mode === 'pretty') {
      output = prettyjson.render(data, {
        keysColor: 'cyan',
        dashColor: 'magenta',
        stringColor: 'white',
        numberColor: 'yellow'
      });
    }
    console.log(output);
  }
};

module.exports = screen;
