// REACT
import React from 'react';

// ROUTER
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminMenu from './admin/AdminMenu'
import Dashboard from './admin/Dashboard';
import Staff from './admin/Staff';
import Products from './admin/Products'
import Purchases from './admin/Purchases'
import Supplies from './admin/Supplies'


class Admin extends React.Component {

  render () {
    return (
      <section className="admin">
        <div className="columns is-fullheight is-marginless">
          <div className="column is-3 bar">
            <BrowserRouter>
              <Switch>
                <Route path="/admin" component={AdminMenu} />
              </Switch>
            </BrowserRouter>
          </div>
          <div className="column is-9 admin-content">
            <div className="admin-container">
              <BrowserRouter>
                <Switch>
                  <Route exact path="/admin" component={Dashboard} />
                  <Route path="/admin/dashboard" component={Dashboard} />
                  <Route path="/admin/staff" component={Staff} />
                  <Route path="/admin/products" component={Products} />
                  <Route path="/admin/purchases" component={Purchases} />
                  <Route path="/admin/supplies" component={Supplies} />
                </Switch>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </section>
    );
  };
};


export default Admin;