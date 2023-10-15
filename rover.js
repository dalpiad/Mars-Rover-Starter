class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   };
   roverStatus() {
      let roverStatusObject = {
         mode: this.mode,
         generatorWatts: this.generatorWatts,
         position: this.position
      }
      return roverStatusObject;
   }
   receiveMessage(message) {
      let responseObject = {
         message: message.name,
         results: []
      }
      for(let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            responseObject.results.push({
               completed: true,
               roverStatus: this.roverStatus()
            }  );
            //responseObject.results.push(processCommand(message.commands[i].commandType));
         } else if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               responseObject.results.push({completed: false});
            } else if (this.mode === 'NORMAL') {
               this.position = message.commands[i].value;
               responseObject.results.push({completed: true});              
            }
         } else if (message.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = message.commands[i].value;
            responseObject.results.push({completed: true});
         } else {
            throw Error ('Unrecognized command type');
         }
         
      }

      return responseObject;
   }
}

// function processCommand(commandType) {
//    let resultObject = {};
//    if(commandType === 'STATUS_CHECK') {
//       resultObject = {
//          completed: true,
//          roverStatus: roverStatus()
//       }    
//    }
//    return resultObject;
// }

module.exports = Rover;