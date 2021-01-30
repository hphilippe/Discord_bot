const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Play = require('./commands/play')
const Message = require('./commands/message')
const Key = require('./config/config.json')

bot.on('ready', function(){
  bot.user.setAvatar('./avatar.jpg').catch(console.error)
  bot.user.setActivity('Snowy').catch(console.error)
})

// bot.on('guildMemberAdd', function(member){
//   member.createdDM().then(function(channel){
//     return channel.send('Bienvenue sur le channel ' + member.displayName)
//   }).catch(console.error)
// })

bot.on('message', function(message){
  let commandUsed =
  Google.parse(message) ||
  //Play.parse(message) ||
  Message.parse(message)
})

bot.login(Key.key)

console.log("ʕ； •`ᴥ•´ʔ Skear Bot is Running!  ʕ￫ᴥ￩　ʔ")
