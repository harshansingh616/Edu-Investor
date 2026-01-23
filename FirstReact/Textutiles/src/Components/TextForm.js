import React, { useState } from 'react'
//import PropTypes from 'prop-types';

export default function TextForm(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.alert("Text has been converted in to uppercase", "success");
    }
    const handleLowClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.alert("Text has been converted in to Lower Case", "success");
    }
    const handleClear = () => {
        
        setText("");
        props.alert("Text has been Cleared", "success");
    }
    const handleXtraSpace = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
    }

    const handleOnChange = (event) => {
        //console.log("OnChange");
        setText(event.target.value);
    }
    const [text, setText] = useState("");
    console.log(props.Mode);
    return (
        <>
            <div className="mb-3">
                <h1 align="center" className="my-2">{props.heading}</h1>
                <label htmlFor="Textarea" className="form-label"></label>
                <textarea className="form-control my-2 mx-2" id="Textarea" style = {{backgroundColor: props.Mode==='dark'?'black':'white',color: props.Mode==='light'?'black':'white'}} value={text} onChange={handleOnChange} rows="10"></textarea>

                <button className="btn btn-primary mx-2" onClick={handleUpClick} >Convert to uppercase</button>
                <button className="btn btn-primary mx-2" onClick={handleLowClick} >Convert to Lowercase</button>
                <button className="btn btn-primary mx-2" onClick={handleClear} >Clear Text</button>
                <button className="btn btn-primary mx-2" onClick={handleXtraSpace} >Remove Extra Space</button>

            </div>
            <div className='container my-3'>
                <h2>Your Text summary</h2>
                <p>
                    {text.split(" ").length} words and {text.length} Characters in yout text.
                </p>
                <h2>Preview</h2>
                <p>{text} </p>
            </div>
        </>
    )
}
