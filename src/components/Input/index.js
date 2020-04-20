import React from "react";


const Input = ({type, placeholder, onChange, validateValue, value}) => {
    const [innerValue, setValue] = React.useState(value);

    const handleChanged = (event) => {
        if(validateValue && !validateValue(event.target.value)) return;
        setValue(event.target.value);
        if(onChange) onChange(event.target.value);
    };

    return (
        <input
        type={type}
        placeholder={placeholder}
        onChange={handleChanged}
        value={innerValue}
        />
    );
}

export default Input