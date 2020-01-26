import React, { Component } from 'react';
import { Table } from './Table';
import { CodeSnippet } from './CodeSnippet';

export class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            tables: 0,
        };
        this.createTable = this.createTable.bind(this);
    }

    createTable() {
        this.setState({ tables: this.state.tables + 1 });
    }

    render() {
        const tableArray = [];
        for (let i = 0; i < this.state.tables; i += 1) {
            tableArray.push(<Table />);
        }
        
        return (
            <div>
                <h1>Main Container</h1>
                <button onClick={this.createTable}>CREATE TABLE</button>
                {tableArray}
                <CodeSnippet />
               
            </div>
        )
    }
}