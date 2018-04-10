const Command = require('./command')
const YoutubeStream = require('ytdl-core')

module.exports = class Play extends Command {

  static match(message){
    return message.content.startsWith('!play')
  }

  static action(message){
    let voiceChannel = message.guild.channels
      .filter(function(channel){ return channel.type === 'voice' })
      .first()
      let args = message.content.split(' ')
    voiceChannel
      .join()
      .then(function(connection){
        // connection.playFile('./demo.mp3')
          let stream = YoutubeStream(args[1])
          stream.on('error', function(){
            message.reply("Je n'ai pas réussi à lire cette video :(")
            connection.disconnect()
          })
          connection
          .playStream(stream)
          .on('end', function(){
            connection.disconnect()
          })
      })
  }

}
