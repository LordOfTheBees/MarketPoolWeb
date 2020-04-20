import React, { Suspense, lazy, useState } from 'react';
import {Route, Switch} from "react-router-dom"

import {Web3Context, ContractContext} from "../../contexts/Web3Context";

import './App.css';
import AppNavbar from './AppNavbar'

const Home = lazy(() => import('../Home'));
const MarketManagment = lazy(() => import('../MarketManagment'));

const App = ({children}) => {
  var web3 = React.useContext(Web3Context);
  var contract = React.useContext(ContractContext);
  window.testWeb3 = web3;
  window.tesContract = contract;

  return (
        <>
        <AppNavbar/>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/MarketManagment' component={MarketManagment}/>
            <Route path='/MarketManagment/Market/:name' component={MarketManagment}/>
          </Switch>
        </Suspense>
        </>);
}

export default App;
