const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", () => {
    let testRover = new Rover(98382);    // Passes 98382 as the rover's position.
    expect(testRover.position).toBe(98382);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let testRover = new Rover(98382);   
    expect(testRover.receiveMessage(message).message).toEqual('Test message with two commands');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let testRover = new Rover(98382);   
    expect(testRover.receiveMessage(message).results.length).toBe(2);
  });

  it("responds correctly to the status check command", () => {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with Status Check', commands);
    let testRover = new Rover(98382);   
    expect(testRover.receiveMessage(message).results).toContain('roverStatus');
    expect(testRover.receiveMessage(message).results).toContain('mode');
    expect(testRover.receiveMessage(message).results).toContain('generatorWatts');
    expect(testRover.receiveMessage(message).results).toContain('position');
  });


});
