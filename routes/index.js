var express = require('express');
var Archiver = require('archiver');
var parser = require('../lib/parser');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Sales Force csv'});
});

router.post('/parse', function (req, res) {
    var files = [];
    var names = [];
    //res.send('Hi');
    var keys = [];
    console.log(req.files);
    for (var key in req) {
        keys.push({key: key, type: typeof req[key]});
    }
    for (var file in req.files) {
        files.push(req.files[file]['path']);
        names.push(req.files[file]['name']);
    }
    var csvs = parser(files);

    if (files.length > 1) {
        var zip = Archiver('zip');
        for (var i = 0, numFiles = files.length; i < numFiles; i++) {
            zip.append(csvs[i], names[i]);
        }
        zip.finalize();
        res.download(zip, 'csvs.zip');
    } else {
        res.setHeader('Content-disposition', 'attachment; filename=' + names[0] + '.csv');
        res.setHeader('Content-type', 'text/csv');
        res.send(csvs[0]);
    }
});

module.exports = router;
