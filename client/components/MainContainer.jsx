import React, { Component } from 'react';
import { Table } from './Table';
import { CodeSnippet } from './CodeSnippet';

export class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            tables: 0,
            tableName: '',
        };
        this.createTable = this.createTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createTable() {
        if (this.state.tables < 1 && this.state.tableName != '')
            this.setState({ tables: this.state.tables + 1 });
    }

    handleChange(event) {
        this.setState({tableName: event.target.value})
    }

    render() {
        const tableArray = [];
        for (let i = 0; i < this.state.tables; i += 1) {
            tableArray.push(<Table tableName={this.state.tableName}/>);
            console.log(this.state.tableName);
        }
        
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>Create Table: </label>
                    <input type="text" placeholder="Name of your table" onChange={this.handleChange} required></input>
                    <button id="tableButton" type="submit" onClick={this.createTable}>+</button>
                </form>
                <br></br>
                {tableArray}
            </div>
        )
    }
}