const expect = require('expect');

var generateMessage = require('./message').generateMessage;

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
