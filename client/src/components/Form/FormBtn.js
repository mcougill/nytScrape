import React from "react";

export const FormBtn = props => (
    <button {...props} style={{ marginBottom: 20 }} className="btn btn-dark">
        {props.children}
    </button>
);