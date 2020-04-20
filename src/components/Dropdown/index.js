import React from "react"
import { Dropdown } from "semantic-ui-react";

const MyDropdown = (props) => {
    
    return (<Dropdown {...props} item closeOnChange search selection/>);
}

export default MyDropdown;