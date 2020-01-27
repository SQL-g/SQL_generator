import React, { Component } from 'react';
import { Table } from './Table';
import { CodeSnippet } from './CodeSnippet';

export class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            tables: [],
            tableName: '',
        };
        this.createTable = this.createTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createTable(e) {
        e.preventDefault();
        this.setState({ tables: [...this.state.tables, this.state.tableName], tableName: '' });
    }

    handleChange(e) {
        this.setState({ tableName: e.target.value })
    }

    render() { 
        return (
            <div>
                <form onSubmit={this.createTable}>
                    <label>Table Name:</label>
                    <input type="text" value={this.state.tableName} onChange={this.handleChange} required/>
                    <button>CREATE TABLE</button>
                </form>
                {
                    this.state.tables.map(
                        tableName => <Table key={tableName} tableName={tableName}/>
                    )
                }
            </div>
        )
    }
}