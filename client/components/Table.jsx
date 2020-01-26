import React, { Component } from 'react';
import { Row } from './Row'

export class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            bools: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleBool=this.handleBool.bind(this);
    }

    handleClick() {
        this.setState({ data: [...this.state.data, {
            name: '',
            type: 'integer',
            isUnique: false,
            isRequired: true,
            default: '',
        }]});
        // this.setState({ bools: [...this.state.bools, true]})
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

    handleBool(index, val) {
        this.setState({ bools: [
            ...this.state.bools.slice(0, index),
            val,
            ...this.state.bools.slice(index + 1),
        ]}, () => { console.log(JSON.stringify(this.state)); });
    }

    render() {
        console.log('rendered');
        return (
            <div>
                <h1>Table</h1>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Is Required</th>
                                <th>Is Unique</th>
                                <th>Default</th>
                            </tr>
                            {
                                this.state.data.map(
                                    (row, i) => <Row key={i} { ...row } idx={i} handleChange={this.handleChange} />
                                )
                            }
                            {/* {
                                this.state.bools.map((val, i) => (
                                    <tr><td><input type="checkbox" name="isRequired" checked={val} onChange={(e) => this.handleBool(i, e.target.checked)} /></td></tr>
                                ))
                            } */}
                        </tbody>
                    </table>
                    <button onClick={this.handleClick} type='button'>Add field</button>
                    <br/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}