var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
/*-----------------SMPT----------------------------------*/

var smtpTransport = nodemailer.createTransport("SMTP",{
	service: "Gmail",
	auth: {
		user: "",//username
		pass: "" //password
	}
});

/*------------------SMTP End-----------------------------*/

	var index = function(req, res){
	    res.render('index.ejs');
	};

	app.use(express.static(__dirname + '/public'));
	app.set('view engine', 'ejs');

/*------------------Routing------------------------*/
	app.get('/', index);
	
	app.get('/send',function(req,res){
			var mailOptions={
				to : req.query.to,
				subject : req.query.subject,
				text : req.query.text 
			}
		if(req.query.to && req.query.subject && req.query.text ){
		console.log(mailOptions);
		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(error);
				res.end("error");
			}else{
				console.log("Message sent: " + response.message);
				res.end("sent");
			}
			});
		}

	});


app.listen(3000,function(){
	console.log("listening Port 3000");
});
