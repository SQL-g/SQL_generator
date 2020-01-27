import React, { Component } from 'react';

export class HeaderContainer extends Component {
    render() {
        return (
            <div>
                <h1>SQL Generator</h1>
                <h3>Generate code for your SQL table in seconds!</h3>
                <h3>Just copy and paste into your own code. Easy.</h3>
                <img id="logo" src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"></img>
            </div>
        )
    }
}