import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';


import {Web3Provider} from "./contexts/Web3Context";
import { MarketsProvider } from "./contexts/MarketsContext";
import { ItemTypesProvider } from "./contexts/ItemTypesContext";

ReactDOM.render(
      <React.StrictMode>
        <Web3Provider>
          <MarketsProvider>
            <ItemTypesProvider>
              <Router>
                <App/>
              </Router>
            </ItemTypesProvider>
          </MarketsProvider>
        </Web3Provider>
      </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
