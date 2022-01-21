const router = require('express').Router();

const vendas_cont = require('../Vendas/Vendas');

router.get('/accessToken', vendas_cont.verAccessToken);
router.get('/refreshToken', vendas_cont.verRefreshToken);
router.get('/getAll', vendas_cont.getAll);
router.get('/getAllProductsStocks', vendas_cont.getAllProductsStocks);
router.get('/getAllInvoices', vendas_cont.getAllInvoices);
router.get('/countInvoices', vendas_cont.countInvoices);
router.get('/countProducts', vendas_cont.countProducts);
router.get('/totalClients', vendas_cont.totalClients);
router.post('/getOneInvoice/:id', vendas_cont.getOneInvoice);
router.post('/getOneProduct/:id', vendas_cont.getOneProduct);
router.get('/deleteInvoice', vendas_cont.deleteInvoice);
router.post('/generateMBReference/:id/:value', vendas_cont.generateMBReference);
router.get('/getAllClients', vendas_cont.getAllClients);
router.post('/getClientByVat/:vat', vendas_cont.getClientByVat);
router.post('/getPDF/:id', vendas_cont.getPDF);
router.post('/sendEmail/:id', vendas_cont.sendEmail);
module.exports = router;