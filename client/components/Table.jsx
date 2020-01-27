import React, { Component } from 'react';
import { Row } from './Row'
import { CodeSnippet } from './CodeSnippet' 

export class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.wasSubmitted = false;
        this.tableSchema = '';
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick() {
        this.setState({ data: [...this.state.data, {
            name: '',
            type: 'integer',
            isUnique: false,
            isRequired: true,
            default: '',
        }]});
    }

    handleChange(index, property, value) {
        //console.log(index, property, value);
        //console.log(JSON.stringify(this.state.data.slice(0, index)));
        this.setState({ data: [
            ...this.state.data.slice(0, index),
            { ...this.state.data[index], [property]: value },
            ...this.state.data.slice(index + 1),
        ]}, () => { console.log(JSON.stringify(this.state)); this.props.handleTableChange(this.props.idx, this.state.data); });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.data);
        this.wasSubmitted = true;

        const { data } = this.state;
        let tableSchema = `CREATE TABLE ${this.props.tableName} (\n\t"_id" serial PRIMARY KEY`;
        data.forEach(field => {
            tableSchema += `,\n\t"${field.name}" ${field.type}`;
            if (field.isRequired) tableSchema += ' NOT NULL';
            if (field.isUnique)  tableSchema += ' UNIQUE';
            if (field.default) tableSchema += ` DEFAULT "${field.default}"`;
        });
        tableSchema += '\n);';
        console.log(tableSchema);
        this.tableSchema = tableSchema;
        this.setState({ data: [] });
    }

    render() {
        console.log('rendered');
        return (
            <div id="tableContainer">
                {
                    !this.wasSubmitted && 
                    <div>
                        <h1>{this.props.tableName}</h1>
                        {/* <form onSubmit={this.handleSubmit}> */}
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Is Required</th>
                                        <th>Is Unique</th>
                                        <th>Default</th>
                                    </tr>
                                    <tr>
                                        <td>_id</td>
                                        <td>
                                            <select disabled>
                                                <option value="serial">serial</option>
                                            </select>
                                        </td>
                                        <td><input type="checkbox" checked={true} disabled /></td>
                                        <td><input type="checkbox" checked={true} disabled /></td>
                                        <td><input type="text" disabled /></td>
                                    </tr>           
                                    {
                                        this.state.data.map(
                                            (row, i) => <Row key={i} { ...row } idx={i} handleChange={this.handleChange} />
                                        )
                                    }
                                </tbody>
                            </table>
                            <br></br>
                            <label id="fieldLabel">Add Field</label>
                            <button onClick={this.handleClick} type='button' id="addFieldButton">+</button>
                            {/* <br/> */}
                            {/* <button type='submit'>Submit</button> */}
                        {/* </form> */}
                    </div>
                }
                {/* {
                    this.wasSubmitted && 
                    <div>
                        <h1>Your SQL Schema</h1>
                        <textarea cols="80" rows="30" value={this.tableSchema} readOnly></textarea>
                    </div>
                } */}
                <br></br>
            </div>
        )
    }
}