import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import './stylesheets/styles.css';
import cronoscope from 'react-chronoscope';


render (
    <App/>,
    document.getElementById('root')
)

cronoscope(document.getElementById('root'));