import React, { useState } from 'react';


const YearlyDisplacement = () => {
    const iframe =  {
        display: 'block',       /* iframes are inline by default */
        background: '#000',
        border: 'none',         /* Reset default border */
        height: '100vh',      /* Viewport-relative units */
        width: '100vw'
    }
   
    return (
        <div>
            <iframe title="prop" src="https://unhcr.github.io/dataviz-somalia-prmn/index.html#reason=&month=&need=&pregion=&pdistrictmap=&cregion=&cdistrictmap=&year=2022" style={iframe}></iframe>
        </div>
       
    )
}

export default YearlyDisplacement 