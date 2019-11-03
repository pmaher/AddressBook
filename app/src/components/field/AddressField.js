import React, { Component } from 'react';
import states from './states.json';
import { ReactInput, templateFormatter, templateParser, parseDigit } from 'input-format';

class AddressField extends Component {

    renderField() {
        const { input, type, name, onPhoneChanged } = this.props;
        if(type === 'select') {
            return <select className="browser-default" { ...input}>
                        {states.map(item => <option key={item.abbreviation} value={item.abbreviation}>{item.name}</option>)}
                    </select>;
        } else if(type === 'phone') {
                    return <ReactInput
                        { ...input}
                        type="text"
                        name={name}
                        onChange={value => (onPhoneChanged(value))}
                        parse={templateParser('(xxx) xxx-xxxx', parseDigit)}
                        format={templateFormatter('(xxx) xxx-xxxx', 'x', true)} />
        } else {
            return <input { ...input } />
        }
    }

    render() {
        const { label, meta: {error, touched }} = this.props;
        return (
            <div>
                <label>{label}</label>
                { this.renderField() }
                <div className="red-text" style={{ marginBottom: '20px'}}>
                    {touched && error}
                </div>
            </div>
        );
    }
};

export default AddressField;