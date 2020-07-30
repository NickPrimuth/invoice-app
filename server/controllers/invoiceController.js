// Import Local Invoice DB
const fileName = '../data/invoices.json';
const fs = require('fs');
const data = require(fileName);
const path = require('path');

const invoiceController = {};

// Return all invoices
invoiceController.getAllInvoices = (req, res, next) => {
  //Read all invoices
  const json = fs.readFileSync(path.resolve(__dirname, fileName), 'utf8');
  const currentInvoices = JSON.parse(json);

  res.locals.allInvoices = currentInvoices;
  console.log('Sent all invoices: ', res.locals.allInvoices);
  return next();
};

invoiceController.getCurrentInvoice = (req, res, next) => {
  //Read all invoices
  const json = fs.readFileSync(path.resolve(__dirname, fileName), 'utf8');
  const currentInvoices = JSON.parse(json);

  // Set id of invoice
  const id = req.params.id;

  console.log(currentInvoices, 'current', id, 'id');

  // Set currentInvoice and send
  res.locals.currentInvoice = currentInvoices[id];
  console.log('Sent one invoice: ', res.locals.currentInvoice);
  return next();
};

// Add an invoice
invoiceController.addInvoice = (req, res, next) => {
  // Get all current invoices
  const json = fs.readFileSync(path.resolve(__dirname, fileName), 'utf8');
  const currentInvoices = JSON.parse(json);

  //create invoice obj
  let newInvoice = req.body;
  newInvoice.id = currentInvoices.length;

  // Add new invoice to end
  currentInvoices.push(newInvoice);
  fs.writeFile(
    path.resolve(__dirname, fileName),
    JSON.stringify(currentInvoices),
    'utf8',
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Added invoice! Total inv ${currentInvoices}`);
    }
  );

  return next();
};

invoiceController.editInvoice = (req, res, next) => {
  const id = req.body.id; // Invoice id to be edited

  // Get all current invoices
  const json = fs.readFileSync(path.resolve(__dirname, fileName), 'utf8');
  const currentInvoices = JSON.parse(json);

  // Insert edited invoice
  currentInvoices[id] = req.body;
  console.log(currentInvoices, 'updated list!');
  fs.writeFile(
    path.resolve(__dirname, fileName),
    JSON.stringify(currentInvoices),
    'utf8',
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`Edited invoice! Total inv ${currentInvoices}`);
    }
  );

  return next();
};

invoiceController.deleteInvoice = (req, res, next) => {
  const id = req.body.id; // Invoice id to be deleted

  // Get all current invoices
  const json = fs.readFileSync(path.resolve(__dirname, fileName), 'utf8');
  const currentInvoices = JSON.parse(json);

  //Remove invoice from list
  currentInvoices.splice(id, 1);

  //Reassign IDs
  const newInvoiceArray = currentInvoices.map((invoice, index) => {
    return {
      ...invoice,
      id: index,
    };
  });

  // Write new invoice list
  fs.writeFile(
    path.resolve(__dirname, fileName),
    JSON.stringify(newInvoiceArray),
    'utf8',
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log(
        `Removed invoice ${id}! Current invoice list ${newInvoiceArray}`
      );
    }
  );
  return next();
};

module.exports = invoiceController;
