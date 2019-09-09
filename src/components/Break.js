import React from 'react';
import './Break.css';
import { FaArrowUp , FaArrowDown } from "react-icons/fa";

const Break = (props) => <div className='Break'>
    <h1>Break Length</h1>
    <div className='Total-Break'><FaArrowDown onClick ={props.handleBreakClickDown}/><h1>{props.Time}</h1><FaArrowUp onClick ={props.handleBreakClickUp}/></div>
</div>

export default Break;
