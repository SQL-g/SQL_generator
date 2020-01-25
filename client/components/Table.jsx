import React, { Component } from 'react';
import { Row } from './Row'

export class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 0,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const rows = this.state.rows + 1;
        this.setState({ rows });
    }

    render() {

        const rows = Array.from({ length: this.state.rows }, (v, i) => <Row key={i}/>);

        return (
            <div>
                <h1>Table</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Is Required</th>
                            <th>Is Unique</th>
                            <th>Default</th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
                <button onClick={this.handleClick}>Add field</button>
                <br/>
                <button>Submit</button>
            </div>
        )
    }
}