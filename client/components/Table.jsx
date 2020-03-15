import React, { Component } from 'react';
import { Row } from './Row'
import { CodeSnippet } from './CodeSnippet' 

export class Table extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    handleClick() {
        this.setState({ data: [...this.state.data, {
            name: '',
            type: 'varchar',
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

    deleteRow(index) {
        const data = this.state.data.slice();
        data.splice(index, 1);
        this.setState({ data }, () => this.props.handleTableChange(this.props.idx, this.state.data));
    }

    render() {
        console.log('rendered');
        return (
            <div id="tableContainer">
                <h1>{this.props.tableName}</h1>
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
                                    (row, i) => <Row key={`Row${i}`} { ...row } idx={i} handleChange={this.handleChange} deleteRow={this.deleteRow}/>
                                )
                            }
                        </tbody>
                    </table>
                    <label id="fieldLabel">Add Field</label>
                    <button onClick={this.handleClick} type='button' id="addFieldButton">+</button>
            </div>
        )
    }
}