// components/Navbar.js
import React from "react";

function Navbar() {
    return (
        <div className="navbar">
        <nav style={{
            backgroundColor: "black",
            color: "white",
            padding: "20px 20px",
            display: "flex",
             marginTop:"0px",
            alignItems: "center",
          
        }}>
            <h1 style={{ margin: 0 }}>Notes</h1>
        </nav>
      </div>
    );
}

export default Navbar;
