import React, { Component } from 'react';
import { Table } from './Table';
import { CodeSnippet } from './CodeSnippet';

export class MainContainer extends Component {
    constructor() {
        super();
        this.state = {table: 0};
        this.createTable = this.createTable.bind(this);
    }

    createTable() {
        const newTable = this.state.table + 1;
        this.setState({table: newTable});
    }
    render() {
        const tableArray = [];
        for (let i = 0; i < this.state.table; i++) {
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