// REACT
import React from 'react';

// ROUTER
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProductsEtsy } from '../../state/actions/stores';

// COMPONENTS
import Nav from './components/Nav';

import Kinds from './products/Kinds';
import Types from './products/Types';
import Categories from './products/Categories';

import CategoryControl from './products/CategoryControl';
import KindControl from './products/KindControl';
import TypeControl from './products/TypeControl';

// CONTAINERS
import Main from './containers/Products';
import Items from './products/Items';
import Bundles from './containers/Products/containers/Bundles';
import Category from './products/Category';

import Supplies from './products/Supplies';
import Kind from './products/Kind';

import Sources from './products/Sources';
import Type from './products/Type';


// ==========

class Products extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <section className="products">
          <div className="columns is-fullheight is-marginless">
            <div className="column is-3 bar">
                <Switch>
                  <Route path="/products/supplies" component={Kinds} />
                  <Route path="/products/sources" component={Types} />
                  <Route path="/products" component={Categories} />
                </Switch>
              </div>
              <div className="column is-9 products-content">
                <Switch>
                  <Route path="/products/supplies" component={KindControl} />
                  <Route path="/products/sources" component={TypeControl} />
                  <Route path="/products" render={() => <CategoryControl getProductsEtsy={this.props.getProductsEtsy} />} />
                </Switch>
                <Nav />
              <div className="products-container">
                <Switch>
                  <Route exact path="/products" component={Main} />
                  <Route path="/products/items" component={Items} />
                  <Route path="/products/bundles" component={Bundles} />
                  <Route path="/products/category" component={Category} />
                  <Route exact path="/products/supplies" component={Supplies} />
                  <Route path="/products/supplies/kind" component={Kind} />
                  <Route exact path="/products/sources" component={Sources} />
                  <Route path="/products/sources/type" component={Type} />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </BrowserRouter>
    );
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getProductsEtsy
}, dispatch);

export default connect(null, mapDispatchToProps)(Products);