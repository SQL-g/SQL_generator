import React, { Component } from 'react';
import { Table } from './Table';
import { CodeSnippet } from './CodeSnippet';


export class MainContainer extends Component {
    render() {
        return (
            <div>
                <h1>Main Container</h1>
                <Table />
                <CodeSnippet />
            </div>
        )
    }
}