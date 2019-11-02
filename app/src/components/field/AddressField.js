import React from 'react';
import states from './states.json';

export default ({ input, label, type, meta: {error, touched }  }) => {
    return (
        <div>
            <label>{label}</label>
            { type === 'select' ?
                (<select className="browser-default" { ...input}>
                    {states.map(item => <option key={item.abbreviation} value={item.abbreviation}>{item.name}</option>)}
                </select>) :
                (<input { ...input } />)
            }
            <div className="red-text" style={{ marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    );
};