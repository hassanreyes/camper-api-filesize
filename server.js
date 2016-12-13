var express = require('express'),
    app = express(),
    multer  = require('multer'),
    port = process.env.PORT;
    
    
var storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { fileSize: 1000000 } }).single('uploadedFile');

app.post('/upload', function (req, res, next) {
    upload(req, res, (err) => {
        if(err){
            console.error('An error occured', err);
            return res.json({ error: err.message });
        }
        
        res.json({ size: req.file.size });
        next();
    });
})
    
/* Home Page */
app.get('/', (req, res) => {
    var url = req.protocol + "://" + req.hostname + "/api/";
    var html = "<h2>File Metadata Microservice</h2>"
            +   "<p>Select a file to upload (1MB Max):</p>"
            +   "<form method='POST' action='/upload' enctype='multipart/form-data'>"
            +       "<input type='file' name='uploadedFile'>"
            +       "<INPUT type='submit'>"
            +   "</form>";
    res.send(html);
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});