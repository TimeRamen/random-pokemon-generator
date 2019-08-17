//const express = require("express");
//const bodyParser = require("body-parser");

//const request = require("request");
const fs = require("fs");
const ikea = JSON.parse(fs.readFileSync("./ikea.json"));
const syl = require('gl-syllabler');
var syll = [];
for(var i = 0 ; i < ikea.length ; i++){
	var cur = syl(ikea[i]).syllables
	for(var j = 0; j < cur.length ; j++){
		syll.push(cur[j]); 
	}
}
const syl2 = [...new Set(syll)];
const type = ["Normal","Fire","Water","Grass","Electric","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dark","Dragon","Steel","Fairy"];

function rand(length,bottom){
	return Math.floor(Math.random() * length) + bottom;
}

function jsUcfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateName(){
	var numSyll = rand(4,1);
	var name = "";
	for(var i = 0; i < numSyll; i++){
		name += syl2[rand(syl2.length,0)];
	}
	return jsUcfirst(name);
}

function generateType(){
	var typing = "";
	var num1 = rand(17,0);
	typing += type[num1];
	
	var types = rand(2,0);
	if(types === 1){
		typing += "-";
		var num2 = rand(17,0);
		while(num2 === num1){
			num2 = rand(17,0);
		}
		typing += type[num2]
	}
	
	return typing;
}

function randDistArray(n,m){
	var randArray = [];//(n);
	var sum = 0;
	
	for(var i = 0; i < n; i++){
		randArray[i] = Math.random();
		sum += randArray[i];
	}
	
	for(var i = 0; i < randArray.length; i++){
		randArray[i] /= sum;
		randArray[i] *= m;
	}
	return randArray;
}

function roundArray(arr){
	for(var i = 0; i < arr.length ; i++){
		arr[i]=Math.round(arr[i]);
	}
	return arr;
}

function randStatTotal(bst){
	return roundStatTotal(roundArray(randDistArray(6,bst)));
}

function roundStatTotal(arr){
	var st = statTotal(arr);
	var dist = st%5;
	var r = rand(6,0);
	if(dist === 0){
		return arr;
	}else{
		
		arr[r] = arr[r] - dist;
		return arr;
	}
}



function statTotal(arr){
	var sum = 0;
	for(var i = 0; i < arr.length ; i++){
		sum += arr[i];
	}
	return sum;
}

function generateGraphicalStats(arr){
	var block = "█";
	var blockArr = [];
	var temp = 0;
	for(var i = 0 ; i < arr.length;i++){
		var blockChain = "";
		temp = Math.round(arr[i]/10);
		if(temp === 0){
			blockChain = "|";
		}
		for(var j=0;j<temp;j++){
			blockChain+=block;
		}
		blockArr[i] = blockChain;
	}
	return blockArr;
}

function generatePokemon(){
	console.log();
	console.log("Name:\t\t"+generateName());
	console.log("Type:\t\t"+generateType());
	console.log();
	var pkm = randStatTotal(rand(600,280));
	var stat = ["HP","Attack","Defence","Sp.Atk","Sp.Def","Speed"];
	var graph = generateGraphicalStats(pkm);
	for(var i = 0;i<pkm.length;i++){
		if(i===2){
			console.log(stat[i] + ":\t" + pkm[i] + "\t" + graph[i]);
		}else{
			console.log(stat[i] + ":\t\t" + pkm[i] + "\t" + graph[i]);
		}
	}
	console.log("BST:\t\t"+statTotal(pkm));	
	
}


generatePokemon();














/*




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



app.listen(3000, function(){
	console.log("Server running at port 3000");
})









*/