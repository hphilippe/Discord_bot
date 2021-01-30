const Command = require('./command')
// const messageJson = require('../config/message.json')
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1bdPCnBVuTTkclDN_up2YzYfL0Yq8uBRqasGSkd9veCo');
var sheet = [];

module.exports = class Message extends Command {

  static match(message){
    // google sheet data
    doc.getRows(1,function(err, rows){
      if(rows){
        rows.forEach(function(element) {
          var obj1 = element.tchatmessagetrigger;
          var obj2 = element.tchatresponsefrombot;
          var obj3 = {
            "tchat" : obj1,
            "response" : obj2
          };
          sheet.push(obj3);
        });

        var motFind = false;
        for(var item in sheet){
          if(message == sheet[item].tchat && !motFind){
            message.channel.send(sheet[item].response);
            motFind = true;
          }
        }

      }
    })

    // match with message.json
    // for(var item in messageJson){
    //   if(message == messageJson[item].tchat){
    //     message.channel.send(messageJson[item].response);
    //   }
    // }

  }

}
