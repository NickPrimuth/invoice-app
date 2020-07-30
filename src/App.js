import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListView from './components/ListView';
import Invoice from './components/Invoice';

function App() {
  return (
    <Router className='App'>
      <header className='App-header'></header>
      <Switch>
        <Route path='/createInvoice'>
          {/* create two components for create and edit routes */}
          {/* then share the main form component inside */}
          <Invoice />
        </Route>
        <Route path='/editInvoice/:id'>
          <Invoice />
        </Route>
        <Route path='/'>
          <ListView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
