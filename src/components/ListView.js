import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListView = () => {
  const [invoices, setInvoices] = useState([]);

  // Func to get invoices
  const getInvoices = async () => {
    // Fetch to api endpoint for invoices
    const invoiceData = await fetch('/api').then((res) => res.json());

    // Update Invoice state
    setInvoices(invoiceData);
  };

  // Call getInvoices on first render
  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div>
      <Link to='/createInvoice'>Create Invoice</Link>{' '}
    </div>
  );
};

export default ListView;
