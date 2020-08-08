import React from 'react'

function Footer() {
    return (
        <div>
            <footer style={footerStyle}>
                <p>Powered by TfL Open Data - Contains OS data © Crown copyright and database rights 2020<br />
Website code and design © Nick Smith 2020, <a href="mailto:development@newsworthyvision.com" target="_blank" rel="noopener noreferrer">development@newsworthyvision.com</a>
                </p>
            </footer>
        </div>
    )
}

const footerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'left',
    padding: '10px',
    fontSize: '0.70rem'
}

export default Footer
