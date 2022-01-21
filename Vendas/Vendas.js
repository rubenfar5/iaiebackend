

const https = require('https');

const request = require('request');
const { url } = require('inspector');
const { getEnvironmentData } = require('worker_threads');
let access_url = 'https://api.moloni.pt/v1';
let client_id = 'g101iaie';
let client_secret = '1e7b48a3e0f6fedd6c3a215157ed4d9a8330775d';
let username = 'a92883@alunos.uminho.pt';
let password = 'Zebra123';
let company_id = '205163';
//let document_id = '455043518';
//let value = '36.9';
let access_token;
let refresh_token;
let email_client;

function verAccessToken(req, res) {
  let data = '';

  https.get(access_url + '/grant/?grant_type=password&client_id=' + client_id + '&client_secret=' + client_secret + '&username=' + username + '&password=' + password, (resp) => {

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;

    });

    var resposta;
    resp.on('end', () => {
      resposta = JSON.parse(data);
      access_token = resposta.access_token;
      refresh_token = resposta.refresh_token;
    return res.send(data);

    });
  });

}


function verRefreshToken(req, res) {
  let data = '';

  https.get(access_url + '/grant/?grant_type=refresh_token&client_id=' + client_id + '&client_secret=' + client_secret + '&refresh_token=' + refresh_token, (resp) => {


    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;

    });

    var resposta;
    resp.on('end', () => {
      //console.log(JSON.parse(data));

      return res.send(data);


    });

  });
}

var resposta;

function getAll(req, resp) {
  var options = {

    'method': 'POST',
    'url': (access_url + '/products/getAll/?access_token=' + access_token),
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send(resposta);
  });
}

function getAllInvoices(req, resp) {
  var options = {

    'method': 'POST',

    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/invoices/getAll/?access_token=' + access_token),
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send(resposta);
  });
}

function getAllProductsStocks(req, resp) {
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/productStocks/getAll/?access_token=' + access_token),
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send(resposta);
  });
}


function getAllClients(req, resp) {
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/customers/getAll/?access_token=' + access_token),
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send(resposta);
  });
}

function generateMBReference(req, resp) {
  let document_id = req.params.id;
  let net_value = req.params.value;
  console.log( net_value);
  console.log(document_id);
 
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/invoices/generateMBReference/?access_token=' + access_token),
   
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id,
      'document_id': document_id,
      'net_value': net_value
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(res.body);
    let valido = JSON.parse(resposta);
    console.log(valido);

    if (valido.valid == "0" ) {
      console.log("if");
       resp.status(422).send({error: 'Option to generate MB reference is set but no payment provider is configurated.'});
     } else {
      console.log("else");
    return resp.send(resposta);
  }
  });  
}

function countProducts(req, resp) {
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/products/count/?access_token=' + access_token),
 
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id,
      
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send(resposta);
  });
}


function countInvoices(req, resp) {
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/invoices/count/?access_token=' + access_token),
 
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id,
      
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send(resposta);
  });
}

function totalClients(req, resp) {
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/customers/count/?access_token=' + access_token),
 
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id,
      
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send(resposta);
  });
}

function getOneInvoice(req, resp) {
  //let document_id = "455034402";
  let document_id = req.body.document_id;
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/invoices/getOne/?access_token=' + access_token),
    
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id,
      'document_id': document_id,
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send(resposta);
  });
}

function getOneProduct(req, resp) {
  //let document_id = "455034402";
  let product_id = req.params.id;
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/products/getOne/?access_token=' + access_token),
    
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id,
      'product_id': product_id,
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send(resposta);
  });
}


function getClientByVat(req, resp) {
  //let document_id = "455034402";
  let vat = req.params.vat;
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/customers/getByVat/?access_token=' + access_token),

    
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id,
      'vat': vat,
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    let teste = JSON.parse(resposta);
    //email_client = teste[0].email;
    //console.log(email_client);
    console.log(JSON.parse(resposta));


    return resp.send(resposta);
  });
}

function getPDF(req, resp) {
  let document_id = req.params.id;
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/documents/getPDFLink/?access_token=' + access_token),

    
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id,
      'document_id': document_id,
    }

  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send(resposta);
  });
}



function deleteInvoice(req, resp) {
  var options = {

    'method': 'POST',
    //invoices está vazio
    // /invoices/getAll/...
    'url': (access_url + '/invoices/delete/?access_token=' + access_token),
    
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'

    },
    form: {
      'company_id': company_id,
      'document_id': document_id,
    }
  };

  request(options, function (error, res) {

    if (error) throw new Error(error);

    //console.log(res.body);
    resposta = res.body;
    console.log(JSON.parse(resposta));
    return resp.send("Delete: " + resposta);
  });
}

function sendEmail(req, res) {
  let urlPDF = JSON.parse(getPDF());
	Email.send({
	Host: "smtp.gmail.com",
	Username : "IAIE.G101.2022@gmail.com",
	Password : "Zebra123iaie",
	To : email_client,
	From : "IAIE.G101.2022@gmail.com",
	Subject : "Invoice - IAIE",
	Body : "Hello \n Here you can see your invoice \n Enjoy \n " + urlPDF,
	}).then(
		message => alert("mail sent successfully")
	);
}


module.exports = {
  verAccessToken: verAccessToken,
  verRefreshToken: verRefreshToken,
  getAll: getAll,
  getAllProductsStocks: getAllProductsStocks,
  getOneProduct: getOneProduct,
  getAllInvoices: getAllInvoices,
  countInvoices: countInvoices,
  countProducts: countProducts,
  getOneInvoice: getOneInvoice,
  deleteInvoice: deleteInvoice,
  generateMBReference: generateMBReference,
  getAllClients: getAllClients,
  getClientByVat: getClientByVat,
  getPDF: getPDF,
  totalClients: totalClients,
  sendEmail: sendEmail,
}
