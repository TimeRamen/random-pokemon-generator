const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const ikea = JSON.parse(fs.readFileSync("./ikea.json"));
//const nlp = require('compromise');
//const nlpSyllables = require('nlp-syllables');
//nlp.plugin(nlpSyllables);
const syl = require('gl-syllabler');



var syll = [];
for(var i = 0 ; i < ikea.length ; i++){
	var cur = syl(ikea[i]).syllables
	for(var j = 0; j < cur.length ; j++){
		syll.push(cur[j]); 
	}
}
let syl2 = [...new Set(syll)]
console.log(syl2);

const app = express();
app.use(bodyParser.urlencoded({extended: true}));








app.get("/", function(req,res){
	res.sendFile(__dirname + "/index.html");
	//console.log(ikea[7]);console.log(ikea[80]);
})

/*
app.post("/", function(req,res){
	//console.log(req.body.crypto);
	//console.log(req.body.flat);
	var url = "-----" + req.body.crypto +req.body.flat;
	
		request(url,function(error,response,body){
			console.log(JSON.parse(body).ask);
			
			res.send("The asking price of "+req.body.crypto + " to "+req.body.flat + " is "+ JSON.parse(body).ask);
		})
})
*/


app.listen(3000, function(){
	console.log("Server running at port 3000");
})