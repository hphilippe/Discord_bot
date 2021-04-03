const Command = require('./command')
// const messageJson = require('../config/message.json')
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1bdPCnBVuTTkclDN_up2YzYfL0Yq8uBRqasGSkd9veCo');
var creds = require('./../config/google-generated-creds.json');
var sheetTable = [];
var sheet;

module.exports = class SwearCounter extends Command {

    static match(message) {

        const words = message.content.split(' ');
        if (words.length != 2 || !words[0].startsWith('!'))
            return;

        if(isNaN(parseInt(words[1])))
        {
            message.channel.send("Blbl apprend a ecrire un chiffre ...");
            return;
        }

        message.channel.send("Swear word detected!!");

        // GoogleSpreadSheet Authentification
        doc.useServiceAccountAuth(creds, function () {

            // Get Infos from GoogleSpreadSheet doc
            doc.getInfo(function (err, info) {
                sheet = info.worksheets[1];

                // Get Rows from sheet
                doc.getRows(2, function (err, rows) {
                    if (rows) {
                        rows.forEach(function (element) {

                            var obj1 = element.name;
                            var obj2 = element.counter;
                            var obj3 = {
                                "name": obj1,
                                "counter": obj2
                            };
                            sheetTable.push(obj3);
                        });

                        var indexLine = 2;
                        var motFind = false;
                        for (var item in sheetTable) {
                            if (words[0].substring(1, words[0].length) == sheetTable[item].name && !motFind) {
                                motFind = true;

                                if (motFind) {
                                    console.log(indexLine);
                                    sheet.getCells(
                                        {
                                            'min-row': indexLine,
                                            'max-row': indexLine,
                                            'min-col': 1,
                                            'max-col': 2,
                                            'return-empty': true
                                        }, function (err, cells) {
                                            var name = cells[0];

                                            var val = cells[1];
                                            val.value = parseInt(val.value) + parseInt(words[1]);
                                            val.save();

                                            message.channel.send(
                                                "Attention " + name.value + ", tu dois deja: " + parseInt(val.value)/100 + "€",
                                            { tts: true });
                                        }
                                    );
                                }

                                break;
                            }

                            indexLine++;
                        }
                    }
                });
            });
        });
    }
}
