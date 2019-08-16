import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import ContactTable from './app/components/ContactTable';
import './mock';

ReactDOM.render(
    <Provider store={store} >
        <ContactTable />
    </Provider>
    , document.getElementById('root')
);