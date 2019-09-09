import React from 'react';
import './Display.css';
import moment from 'moment' //quên thì lên đây coi lại https://stackoverflow.com/questions/37993202/moment-js-with-react-js-es6

const Display = (props) => <div className='Display'>
    <h1>{props.Display}</h1>
    <div className='Total-Display'><h1>{ moment(props.Time).format('mm:ss') }</h1></div>
</div>

export default Display;
