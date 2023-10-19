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
    expect(testRover.receiveMessage(message).results).toEqual(expect.arrayContaining([expect.objectContaining({'completed': expect.any(Boolean), 'roverStatus': expect.objectContaining({'mode': expect.any(String), 'generatorWatts': expect.any(Number), 'position': expect.any(Number)})})]));
  });

  it("responds correctly to the mode change command", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with MODE_CHANGE command', commands);
    let testRover = new Rover(98382);   
    expect(testRover.receiveMessage(message).results[0].completed).toBe(true);
    expect(testRover.roverStatus().mode).toBe('LOW_POWER');
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12345)];
    let message = new Message('Test message with two commands', commands);
    let testRover = new Rover(98382);
    expect(testRover.receiveMessage(message).results[0].completed).toBe(true);   
    expect(testRover.roverStatus().mode).toBe('LOW_POWER');
    expect(testRover.receiveMessage(message).results[1].completed).toBe(false);
  });

  it("responds with the position for the move command", () => {
    let commands = [new Command('MOVE', 12345)];
    let message = new Message('Test message with a MOVE command', commands);
    let testRover = new Rover(98382);
    expect(testRover.receiveMessage(message).results[0].completed).toBe(true);   
    expect(testRover.roverStatus().position).toBe(12345);
  });


});
