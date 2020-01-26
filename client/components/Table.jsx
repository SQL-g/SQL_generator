import React, { Component } from 'react';

import { Row } from './Row'

import { CodeSnippet } from './CodeSnippet' 

export class Table extends Component {
    constructor() {
        super();
        this.state = {
            row: 0,
            box: 0
        };
        this.addField = this.addField.bind(this);
        this.addOutPut = this.addOutPut.bind(this)
    }

    addField() {
        const newRow = this.state.row + 1;
        this.setState({row: newRow}, () => 
        console.log(this.state.row));
    }

    addOutPut() {
        if(this.state.box < 1) {
            const outPutBox =  this.state.box + 1;
            this.setState({box: outPutBox})
          }
        }

    render() {
        const rowArray = [];
        for (let i = 0; i < this.state.row; i++) {
            rowArray.push(<Row />);
        }
        const box = [];
        for (let i = 0; i < this.state.box; i++) {
            box.push(<CodeSnippet />)
        }
        return (
            <div>
                <table>
                    <tbody >
                    <tr className="row">
                     <td className="row">name</td>
                     <td className="row">type</td>
                     <td className="row">is required</td>
                     <td className="row">is unique</td>
                     <td className="row">default</td>
                    </tr>
                    <tr className="row">
                     <td className="row">id</td>
                     <td className="row">serial</td>
                     <td className="row">yes</td>
                     <td className="row">yes</td>
                     <td className="row">blank</td>
                    </tr>           
                    </tbody>
                </table>

                {rowArray}

                <div className="addField" onClick={this.addField}>
                    <button>ADD FIELD</button>
                </div>
                <div className="addOutPut" onClick= {this.addOutPut}>
                <button> Output Box</button>
                </div>
                {box}
         </div>
        )
    }
}