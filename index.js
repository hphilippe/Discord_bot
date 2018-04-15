const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Ping = require('./commands/ping')
const Play = require('./commands/play')
const Aurelien = require('./commands/aurelien')
const Lion = require('./commands/lion')

bot.on('ready', function(){
  bot.user.setAvatar('./avatar.jpg').catch(console.error)
  bot.user.setActivity('R6 God Player').catch(console.error)
})

// bot.on('guildMemberAdd', function(member){
//   member.createdDM().then(function(channel){
//     return channel.send('Bienvenue sur le channel ' + member.displayName)
//   }).catch(console.error)
// })

bot.on('message', function(message){
  let commandUsed =
  Google.parse(message) ||
  Play.parse(message) ||
  Ping.parse(message) ||
  Aurelien.parse(message) ||
  Lion.parse(message)
})

bot.login('put token')
