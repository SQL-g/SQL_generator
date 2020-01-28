import React, { Component } from 'react';
import { Row } from './Row'
import { CodeSnippet } from './CodeSnippet' 

export class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    // this function will be invoked in the handle change of the row - so that the state of the whole table will be updated
    handleChange(index, property, value) {
        this.setState({ data: [
            ...this.state.data.slice(0, index),
            { ...this.state.data[index], [property]: value },
            ...this.state.data.slice(index + 1),
        ]}, () => { console.log(JSON.stringify(this.state)); this.props.handleTableChange(this.props.idx, this.state.data); });
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
                                    (row, i) => <Row key={i} { ...row } idx={i} handleChange={this.handleChange} />
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