import React from 'react';
import './Menu.css';
import { FaPlay , FaStop , FaSyncAlt } from "react-icons/fa";

const Menu = (props) =>

<div className ='Menu'>
    
    <FaPlay className='FaMenu'
onClick ={props.handleMenuClickStart}
    />
    
    <FaStop className='FaMenu'
onClick ={props.handleMenuClickPause}    
    />
    
    <FaSyncAlt className='FaMenu' 
onClick ={props.handleMenuClickWipeAll}
/>
</div>

export default Menu;
