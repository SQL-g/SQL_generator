import React, { Component } from 'react';
import { Row } from './Row'

export class Table extends Component {
    render() {
        return (
            <div>
                <h1>Table</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Is Required</th>
                        <th>Is Unique</th>
                        <th>Default</th>
                    </tr>
                    <Row />
                </table>
            </div>
        )
    }
}