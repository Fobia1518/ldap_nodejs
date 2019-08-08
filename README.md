

# LDAP library nodejs

### ldap_nodejs


## Requires

```js
var ldap = require('ldapjs');
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = process.env.port || 3000; 
```

## Use

```js
app.use(cors()); //https://www.npmjs.com/package/cors
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
```

## Function Auth()

Get the data and connect to the server


## Help

- [LDAP](http://ldapjs.org/)
- [Cors](https://www.npmjs.com/package/cors)
- [Express](https://www.npmjs.com/package/express)
- [Body parser](https://www.npmjs.com/package/body-parser)