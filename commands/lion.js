const Command = require('./command')

module.exports = class Lion extends Command {

  static match(message){
    return message.content.startsWith('!lion')
  }

  static action(message){
    message.channel.send('https://media.giphy.com/media/DvMHwFYLVHlZe/giphy.gif')
  }

}
