const express = require('express');

const invoiceController = require('../controllers/invoiceController');

const router = express.Router();

router.get('/', invoiceController.getAllInvoices, (req, res) =>
  res.status(200).json(res.locals.allInvoices)
);

router.get('/:id', invoiceController.getCurrentInvoice, (req, res) =>
  res.status(200).json(res.locals.currentInvoice)
);

router.post('/addInvoice', invoiceController.addInvoice, (req, res) =>
  res.redirect('/')
);

router.put('/editInvoice', invoiceController.editInvoice, (req, res) =>
  res.status(200).json(res.locals.allInvoices)
);

router.put('/deleteInvoice', invoiceController.deleteInvoice, (req, res) =>
  res.status(200).json(res.locals.allInvoices)
);

module.exports = router;
