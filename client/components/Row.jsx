import React, { Component } from 'react';

export class Row extends Component {
    render() {
        return (
            <tr>
                <td><input type="text"/></td>
                <td>
                    <select name="" id="">
                        <option value="integer">integer</option>
                        <option value="varchar">varchar</option>
                        <option value="timestamp">timestamp</option>
                    </select>
                </td>
                <td>
                    <select name="" id="">
                        <option value="yes">yes</option>
                        <option value="yes">no</option>
                    </select>
                </td>
                <td>
                    <select name="" id="">
                        <option value="yes">yes</option>
                        <option value="yes">no</option>
                    </select>
                </td>
                <td><input type="text"/></td>
            </tr>
        )
    }
}