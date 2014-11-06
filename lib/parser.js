#! /usr/bin/env node
var xlsx = require('node-xlsx'),
        fs = require('fs');

var userArgs = process.argv.slice(2);

if (!userArgs.length) {
    console.log('No file input');
} else {
    for (var f = 0, numFiles = userArgs.length; f < numFiles; f++) {
        var path = userArgs[f];
        var obj = xlsx.parse(path);
        var counter = 0;
        var csv = '';
        for (var key in obj) {
            var name = obj[key]['name'];
            var data = obj[key]['data'];
            for (var i = 1, numRegisters = data.length; i < numRegisters; i++) {
                var register = data[i];
                for (var j = 0, numFields = register.length; j < numFields; j++) {
                    csv += register[j] === undefined ? '' : String(register[j]).replace('\n', '').replace('\r', '').trim();
                    if (j < numFields - 1) {
                        csv += ',';
                    }
                }
                csv += '\r\n';
            }
        }
        var fs = require('fs');        
        fs.writeFile(path + '.csv', csv, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    }
}