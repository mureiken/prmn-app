import React from 'react';

const PowerBIProtectionDashboard = () => {
    const iframe =  {
        display: 'block',       /* iframes are inline by default */
        background: '#000',
        border: 'none',         /* Reset default border */
        height: '100vh',      /* Viewport-relative units */
        width: '100vw'
    }
   
    return (
        <div>
            <iframe title="prop" src="https://app.powerbi.com/view?r=eyJrIjoiMTkwMjAzN2QtZTdkZi00MjdiLWFkODktNTM1MmQ1NzlhMWZmIiwidCI6ImU1YzM3OTgxLTY2NjQtNDEzNC04YTBjLTY1NDNkMmFmODBiZSIsImMiOjh9" style={iframe}></iframe>
        </div>
       
    )
}

export default PowerBIProtectionDashboard 