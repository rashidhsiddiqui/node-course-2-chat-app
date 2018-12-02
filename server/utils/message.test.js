var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message.js");

describe("generateMessage", () => {

  it("should generate correct message object", () => {

    var from = "Rashid";
    var text = "Hey World!";
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({from, text});

  });
});

describe("generateLocationMessage", () => {

  it("should generate correct location object", () => {

    var from = "Rashid";
    var latitude = 1;
    var longitude = 1;

    var message = generateLocationMessage(from, latitude, longitude);

    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({from, url});
    expect(message.url).toBe(url);

  });
});
