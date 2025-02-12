var Expresss = require('express');

const path = require('path');
const PORT = 3000;

var app = Expresss();


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, './FrontEnd/index.html'));
})











app.listen(PORT, function () {
	console.log(`Server started on port ${PORT}`);
})