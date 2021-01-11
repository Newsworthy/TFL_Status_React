import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div>
                <header style={headerStyle}>
                <h1>Transport for London - Status Updates</h1>
                <h6>Last data update: {this.props.lastUpdate.toString()}</h6>
            </header>
            </div>
        )
    }
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '30px'
}

export default Header
