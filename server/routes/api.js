const express = require('express');

const invoiceController = require('../controllers/invoiceController');

const router = express.Router();

router.get('/', invoiceController.getAllInvoices, (req, res) =>
  res.status(200).json(res.locals.allInvoices)
);

router.get('/:id', invoiceController.getCurrentInvoice, (req, res) =>
  res.status(200).json(res.locals.currentInvoice)
);

router.post('/addInvoice', invoiceController.addInvoice, (req, res) => {
  res.json(res.locals.newInvoices);
});

router.post('/editInvoice', invoiceController.editInvoice, (req, res) => {
  res.json(res.locals.editedInvoices);
});

router.post('/deleteInvoice', invoiceController.deleteInvoice, (req, res) =>
  res.json(res.locals.invoices)
);

module.exports = router;
