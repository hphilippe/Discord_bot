const Command = require('./command')

module.exports = class Aurelien extends Command {

  static match(message){
    return message.content.startsWith('!aurelien')
  }

  static action(message){
    message.channel.send('Aurélien comme la profession')
    message.channel.send('http://static8.viadeo-static.com/IyNpDWJ3KzM9okUC4kfnXdnGO1A=/300x300/member/0028evlfkk443o5?ts=1464270346000')
  }

}
