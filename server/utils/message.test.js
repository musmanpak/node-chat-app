const expect = require('expect');

var generateMessage = require('./message').generateMessage;
var generateLocationMessage = require('./message').generateLocationMessage;

describe('generateMessage', () => {

  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some Message';
    var message = generateMessage(from, text);

    // expect(message.createdAt).toBeA('number');
    // expect(2).toBeA('number');
    // expect(message).toInclude({ from, text });

  });
});


describe('generateLocationMessage', () => {

  it('should generate correct location object', () => {
    var from = 'Jen';
    var lat = 12;
    var long = 15;
    var url = 'http://www.google.com/maps?15,19';
    var message = generateMessage(from, text);

    // expect(message.createdAt).toBeA('number');
    // expect(2).toBeA('number');
    // expect(message).toInclude({ from, text });

  });
});
