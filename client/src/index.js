import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./hooks/contract";

ReactDOM.render(
<BrowserRouter>
    <Provider>
        <App />
    </Provider>
</BrowserRouter>
,document.getElementById('root'));
