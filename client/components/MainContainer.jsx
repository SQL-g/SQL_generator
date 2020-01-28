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
        this.textareaRows = 0;
    }

    createTable(e) {
        e.preventDefault();
        // on creation of the new table
        // 1. add the tableName to the tables Array
        // 2. add an empty array to the end of data array - each array in the this.state.data represents the Table 
        this.setState({ tables: [...this.state.tables, this.state.tableName],
            tableName: '',
            data: [...this.state.data, []],
        }, () => console.log(JSON.stringify(this.state.data)));
    }

    handleChange(e) {
        // change the table name on input
        this.setState({ tableName: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();

        // create the string for the code snippet on submission
        let codeSnippet = '';
        this.textareaRows = 0;

        const { data: arrayOfTables } = this.state;
        // each element in the array of Tables is an array where each element is an object that represents the field
        arrayOfTables.forEach((table, i) => {
            let tableSchema = `CREATE TABLE ${this.state.tables[i]} (\n\t"_id" serial PRIMARY KEY`;
            table.forEach(field => {
                this.textareaRows += 1;
                tableSchema += `,\n\t"${field.name}" ${field.type}`;
                if (field.isRequired) tableSchema += ' NOT NULL';
                if (field.isUnique)  tableSchema += ' UNIQUE';
                if (field.default) {
                    if ('-0123456789'.includes(field.default[0])) tableSchema += ` DEFAULT ${field.default}`;
                    else tableSchema += ` DEFAULT "${field.default}"`;
                }
            });
            tableSchema += '\n);';
            codeSnippet += tableSchema + '\n\n';
            this.textareaRows += 4;
        });

        console.log(codeSnippet);

        this.codeSnippet = codeSnippet;
        this.setState({ isSubmitted: true });
    }

    // this function is invoked in the Table component inside of the other handleChange function
    // it allows to have updated data from all tables in this component - to use it for the codeSnippet on submission
    handleTableChange(index, table) {
        this.setState({ data: [
            ...this.state.data.slice(0, index),
            [...table],
            ...this.state.data.slice(index + 1),
        ]}, () => { console.log(this.state.data); });
    }

    render() { 
        return (
            <div className='rowC'>
                <div>
                    <form onSubmit={this.createTable}>
                        <label id="tableLabel">Create Table: </label>
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
                {
                    this.state.isSubmitted && 
                    <div id="codeSnippetBox">
                        <h1>Your SQL Schema</h1>
                        <textarea cols="80" rows={this.textareaRows} value={this.codeSnippet} readOnly></textarea>
                    </div>
                }
            </div>
        )
    }
}