import React from 'react';
import classes from '../static/Header.module.css';

const Header = (props) => {
    return (
        <div className={classes.header}>
            <b> Client Info</b>
            <h4>{props.firstName}&nbsp; {props.lastName}</h4>
            <h6 style={{ color:'#003983'}}> ID : {props.clientID}</h6>
        </div>
    );
}

export default Header;