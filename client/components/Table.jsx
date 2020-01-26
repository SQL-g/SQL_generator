import React, { Component } from 'react';
import { Row } from './Row'

import { CodeSnippet } from './CodeSnippet' 

export class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            box: 0,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addOutPut = this.addOutPut.bind(this);
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
        console.log(index, property, value);
        console.log(JSON.stringify(this.state.data.slice(0, index)));
        this.setState({ data: [
            ...this.state.data.slice(0, index),
            { ...this.state.data[index], [property]: value },
            ...this.state.data.slice(index + 1),
        ]}, () => { console.log(JSON.stringify(this.state)); });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.data);
        this.setState({ data: [] });
    }

    addOutPut() {
        if(this.state.box < 1) {
            const outPutBox =  this.state.box + 1;
            this.setState({box: outPutBox})
          }
        }

    render() {
        console.log('rendered');
        const box = [];
        for (let i = 0; i < this.state.box; i++) {
            box.push(<CodeSnippet />)
        }
        return (
            <div>
                <h1>Table</h1>
                <form onSubmit={this.handleSubmit}>
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
                    <button onClick={this.handleClick} type='button'>Add field</button>
                    <br/>
                    <button type='submit'>Submit</button>
                </form>
                <div className="addOutPut" onClick= {this.addOutPut}>
                <button> Output Box</button>
                </div>
                {box}
            </div>
        )
    }
}