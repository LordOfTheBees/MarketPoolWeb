import React, { useState, useEffect, lazy } from 'react';
import {Route, Switch, useParams, useRouteMatch, Link, useHistory} from "react-router-dom"
import { Container } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css'
import './style.css'

import MarketManagmentNavBar from "./MarketManagmentNavBar";
import { MarketsContext } from "../../contexts/MarketsContext";
import {Web3Context, ContractContext} from "../../contexts/Web3Context";

const CreateMarket = lazy(() => import('../CreateMarket'));
const ItemTypesTable = lazy(() => import('../ItemTypesTable'));
const CreateItemType = lazy(() => import('../CreateItemType'));

const MarketManagment = (props) => {
  var web3 = React.useContext(Web3Context);
  var contract = React.useContext(ContractContext);
  var markets = React.useContext(MarketsContext);
  
  let history = useHistory();
  let { path, url } = useRouteMatch();

  return (
        <div className="container">
        <MarketManagmentNavBar/>
        <Switch>
          <Route exact path={`${path}`} component={() => (<div>Hello</div>)}/>
          <Route exact path={`${path}/ItemTypes`} component={ItemTypesTable}/>
          <Route path={`${path}/ItemTypes/Create`} component={CreateItemType}/>
          <Route path={`${path}/CreateMarket`} component={CreateMarket}/>
        </Switch>
        </div>
  )
}

export default MarketManagment;