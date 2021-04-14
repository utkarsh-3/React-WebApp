import React from 'react';
import classes from '../static//Input.module.css';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];
    

    if (props.inValid && props.shouldValidate && props.touched) {
        validationError = <p>Please enter a valid value !</p>;
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = < input className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} />
            break;
        case 'CountryDropdown':
            inputElement = <CountryDropdown  onChange={props.changed} value={props.value}/>
            break;
        case 'RegionDropdown':
            inputElement = <RegionDropdown  onChange={props.changed} value={props.value} {...props.elementConfig}/>
            break;
        default:
            inputElement = < input className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} />
    }
    
    return (
        <div >
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <p className={classes.error}>{validationError}</p>
        </div>
    );
};

export default Input;