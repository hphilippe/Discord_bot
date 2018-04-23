const Command = require('./command')
const messageJson = require('../config/message.json')

module.exports = class Message extends Command {

  static match(message){
    for(var item in messageJson){
      if(message == messageJson[item].tchat){
        message.channel.send(messageJson[item].response);
      }
    }
  }

}
