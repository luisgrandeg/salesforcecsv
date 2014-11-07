var xlsx = require('node-xlsx')

module.exports = function (files) {
    var csvs = [];
    for (var f = 0, numFiles = files.length; f < numFiles; f++) {
        var path = files[f];
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
        csvs.push(csv);
    }
    return csvs;
};