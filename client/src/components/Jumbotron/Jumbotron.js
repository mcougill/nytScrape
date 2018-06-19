import React from "react";


const Jumbotron = ({ children }) => (
  <div className="jumbotron"
    style={{ height: 100, 
      clear: "both", 
      paddingTop: 25, 
      textAlign: "center", 
      backgroundColor:"#ffffad", 
      fontFamily:'Fjalla One'
    }}
  >
    {children}
  </div>
);

export default Jumbotron;