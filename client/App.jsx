import React, { Component } from 'react';
import { HeaderContainer } from './components/HeaderContainer';
import { MainContainer } from './components/MainContainer';

export class App extends Component {
    render() {
        return (
            <>
                <HeaderContainer />
                <br></br>
                <MainContainer />
            </>
        )
    }
}