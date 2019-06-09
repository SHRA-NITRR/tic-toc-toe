import React from 'react';

const SelectPreference=(props)=>{
    const baseClass='select-container';
    return(
        <div className= {props.selectedOptions?`${baseClass} disabled`:baseClass}>
            <p>Select your Symbol:</p>
            {props.options.map((item, index)=>{
                    return(
                    <label key={index} className="radio">
                        <input
                        type="radio"
                        value={item}
                        checked={item === props.selectedOptions}
                        onChange={()=>props.handleChange(item)}
                        />
                        <span>{item}</span>
                    </label>)
            })
            }
        </div>
    );
}
export default  SelectPreference;