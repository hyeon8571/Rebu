// src/index.js
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
  // document.getElementById('root')
);
