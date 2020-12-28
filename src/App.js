import React, { Component } from 'react';
import Aux from './hoc/Aux/Aux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </Aux>
    );
  }
}

export default App;
