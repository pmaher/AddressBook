import React from 'react';
import states from './states.json';

export default ({ input, label, type }) => {
    return (
        <div>
            <label>{label}</label>
            { type === 'select' ?
                (<select className="browser-default" { ...input}>
                    {states.map(item => <option key={item.abbreviation} value={item.abbreviation}>{item.name}</option>)}
                </select>) :
                (<input { ...input } />)
            }
            
        </div>
    );
};