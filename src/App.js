import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import ListView from './components/ListView/ListView';
import EditInvoice from './components/InvoiceDetails/EditPage/EditInvoice';
import CreateInvoice from './components/InvoiceDetails/CreatePage/CreateInvoice';
import Header from './components/Header';

function App() {
  const [invoices, setInvoices] = useState(null);
  const [redirect, setRedirect] = useState(false);

  // Get all invoices on first render
  useEffect(() => {
    const getInvoices = async () => {
      const invoiceData = await fetch('/api').then((res) => res.json());
      setInvoices(invoiceData);
    };
    getInvoices();
  }, []);

  // For redirect from Create / Edit page
  const handleRedirect = () => {
    setRedirect(true);
    setRedirect(false);
  };

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/createInvoice'>
          {/* Render once invoices have been fetched */}
          {invoices ? (
            <CreateInvoice
              setInvoices={setInvoices}
              handleRedirect={handleRedirect}
              redirect={redirect}
            />
          ) : null}
        </Route>
        <Route path='/editInvoice/:id'>
          {invoices ? (
            <EditInvoice
              invoices={invoices}
              setInvoices={setInvoices}
              redirect={redirect}
              handleRedirect={handleRedirect}
            />
          ) : null}
        </Route>
        <Route path='/'>
          {/* Render once invoices have been fetched */}
          {invoices ? <ListView invoices={invoices} /> : null}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
