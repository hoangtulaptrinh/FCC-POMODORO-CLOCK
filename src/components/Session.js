import React from 'react';
import './Session.css';
import { FaArrowUp , FaArrowDown } from "react-icons/fa";

const Session = (props) => <div className='Session'>
    <h1>Session Length</h1>
    <div className='Total-Session'><FaArrowDown onClick ={props.handleSessionClickDown} /><h1>{props.Session}</h1><FaArrowUp onClick ={props.handleSessionClickUp} /></div>
</div>

export default Session;
