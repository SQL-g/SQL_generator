import React, { Component } from 'react';

export class CodeSnippet extends Component {
    constructor(props) {
        super(props);
    }

   
    render() {
        return (
            <div>
                <h2>SQL Code Snippet</h2>
                <label htmlFor="" type="text">
                    <textarea id="codeSnippetBox">{this.props.codeSnippet}</textarea>
                </label>
            </div>
            
            
        )
    }
}