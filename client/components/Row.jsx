import React, { Component } from 'react';

export class Row extends Component {
    render() {
        return (
            <tr>
                <td><input type="text"/></td>
                <td></td>
                <td><input type="text"/></td>
                <td><input type="text"/></td>
                <td><input type="text"/></td>
            </tr>
        )
    }
}