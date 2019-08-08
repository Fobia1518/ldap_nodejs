//Requires
var ldap = require('ldapjs');
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = process.env.port || 3000; 

app.use(cors()); //https://www.npmjs.com/package/cors
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

function auth(data){
  //Variables
  var username = data.user;
  var password = data.pass;
  var suffix = data.suffix; '@domain.com.co'
  var userldap = username + suffix;
  var ldapserver = data.server;
  
  var client = ldap.createClient({
    url: ldapserver //'ldap://domain.com.co:389'
});
  
  var opts = {
  	filter: '(&(objectCategory=person)(objectClass=user)(UserPrincipalName='+ username + suffix +'))',
  	scope: 'sub',
  	attributes: ['dn','displayName', 'mail', 'description']
  };
  
  client.bind(userldap, password, function (err, next) {
    /*
    InvalidCredentialsError: 80090308: LdapErr: DSID-0C09042F, comment: AcceptSecurityContext error, data 775, v2580 bloqueado 49
    InvalidCredentialsError: 80090308: LdapErr: DSID-0C09042F, comment: AcceptSecurityContext error, data 52e, v2580 erroneo

    */
    if(err){
    	console.log('Usuario o contraseña erronea ' + err.code);
      // return next(new ldap.OperationsError(err.message));
      return false;
  }
  client.search('DC=multienlace,DC=com,DC=co', opts, function (err, search) {
  	if(err){
  		console.log(err);
  		return false;
  	}
  	search.on('searchEntry', function (entry) {
  		var user = entry.object;
  		console.log(user); 
  	});
  });
});
}


app.get('/',(req, res)=>{
	res.status(200).send('hola');
});

app.post('/ldap', function (req, res) {
	auth(req.body);
	res.send('[POST]Saludos desde express');
});

app.listen(port, function() {
	console.log(`Node server running on http://localhost:${port}`);
});