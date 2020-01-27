import React, { Component } from 'react';
import { Table } from './Table';
import { CodeSnippet } from './CodeSnippet';

export class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            tables: [],
            tableName: '',
            isSubmitted: false,
            data: [],
        };
        this.createTable = this.createTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.codeSnippet = '';
    }

    createTable(e) {
        e.preventDefault();
        this.setState({ tables: [...this.state.tables, this.state.tableName],
            tableName: '',
            data: [...this.state.data, []],
        }, () => console.log(JSON.stringify(this.state.data)));
    }

    handleChange(e) {
        this.setState({ tableName: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();

        let codeSnippet = '';

        const { data: arrayOfTables } = this.state;
        arrayOfTables.forEach((table, i) => {
            let tableSchema = `CREATE TABLE ${this.state.tables[i]} (\n\t"_id" serial PRIMARY KEY`;
            table.forEach(field => {
                tableSchema += `,\n\t"${field.name}" ${field.type}`;
                if (field.isRequired) tableSchema += ' NOT NULL';
                if (field.isUnique)  tableSchema += ' UNIQUE';
                if (field.default) tableSchema += ` DEFAULT "${field.default}"`;
            });
            tableSchema += '\n);';
            // console.log(tableSchema);
            codeSnippet += tableSchema + '\n\n';
        });

        console.log(codeSnippet);

        this.codeSnippet += codeSnippet;
        this.setState({ isSubmitted: true });
    }

    handleTableChange(index, table) {
        this.setState({ data: [
            ...this.state.data.slice(0, index),
            [...table],
            ...this.state.data.slice(index + 1),
        ]}, () => { console.log(this.state.data); });
    }

    render() { 
        return (
            <div>
                {
                    !this.state.isSubmitted && 
                    <div>
                        <form onSubmit={this.createTable}>
                            <label>Create Table: </label>
                            <input type="text" placeholder="Name of your table" value={this.state.tableName} onChange={this.handleChange} required/>
                            <button id="tableButton">+</button>
                        </form>
                        <form onSubmit={this.handleSubmit}>
                            {
                                this.state.tables.map(
                                    (tableName, i) => <Table key={tableName} tableName={tableName} idx={i} handleTableChange={this.handleTableChange} />
                                )
                            }
                            <button id="submitButton">Submit</button>
                        </form>
                    </div>
                }
                {
                    this.state.isSubmitted && 
                    <div>
                        <h1>Your SQL Schema</h1>
                        <textarea cols="80" rows="30" value={this.codeSnippet} readOnly></textarea>
                    </div>
                }
            </div>
        )
    }
}