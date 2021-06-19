const express = require('express');

const app = express();

const mysql = require('mysql');

const bodyParser = require('body-parser');

const hbs = require('hbs');


const conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'crud_node'
});

conn.connect((err) => {
	if (err) throw err;
	console.log('MySQL connected');
});


app.set('view engine','hbs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', (req, res) => {

	var sql = "SELECT * FROM produk";
	var quert = conn.query(sql, (err, results)=>{
		if (err) throw err;
		res.render('index', {results: results});
	}); 

});


app.post('/save', function(req, res){
	var data = {
		'id' : req.body.id,
		'nama' : req.body.nama,
		'jumlah' : req.body.jumlah
	};

	var sql =  "INSERT INTO produk SET ?";
	var queri = conn.query(sql, data, (err, results)=>{
		if (err) throw err;
		res.redirect('/');

	});
});

app.post('/delete', function(req, res){
	var id = req.body.id;
	var sql = "DELETE FROM produk WHERE id ='"+id+"'";
	var query = conn.query(sql, function(err, results){
		if (err) throw err;
		res.redirect('/')

	});
})

app.post('/update', function(req, res){
	var id = req.body.id;
	var sql = "UPDATE produk SET nama = '"+req.body.nama+"', jumlah = '"+req.body.jumlah+"' WHERE id = '"+id+"'";
	var query = conn.query(sql, function(err, results){
		if (err) throw err;
		res.redirect('/');
	})
});



app.listen(8000, function(){
	console.log('server run on port 8000');
})