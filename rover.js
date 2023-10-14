class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   };
   receiveMessage(message) {
      let responseObject = {
         message: message.name,
         results: []
      }
      for(let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            responseObject.results.push('Test');
         } else {
            responseObject.results.push(message.commands[i]);
         }
         
      }

      return responseObject;
   }

}

module.exports = Rover;