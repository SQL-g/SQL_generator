import React, { Component } from 'react';

export class Row extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.handleChange(
            this.props.idx,
            e.target.name,
            e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        );
    }

    render() {
        console.log('isRequired: ', this.props.isRequired);
        return (
            <tr>
                <td><input type="text" name="name" value={this.props.name} onChange={this.handleChange} required /></td>
                <td>
                    <select name="type" value={this.props.type} onChange={this.handleChange}>
                        <option value="varchar">varchar</option>
                        <option value="integer">integer</option>
                        <option value="timestamp">timestamp</option>
                    </select>
                </td>
                <td><input type="checkbox" name="isRequired" checked={this.props.isRequired} onChange={this.handleChange} /></td>
                <td><input type="checkbox" name="isUnique" checked={this.props.isUnique} onChange={this.handleChange} /></td>
                <td>
                    <input type={this.props.type === 'integer' ? 'number' : 'text'} name="default" value={this.props.default} onChange={this.handleChange} />
                </td>
                <td className="noBorder"><button type='button' id="addFieldButton" onClick={() => this.props.deleteRow(this.props.idx)}>-</button></td>
            </tr>
        )
    }
}