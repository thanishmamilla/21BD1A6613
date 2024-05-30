import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllProductsPage from './components/AllProductsPage';
import ProductDetailPage from './components/ProductDetailPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllProductsPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
