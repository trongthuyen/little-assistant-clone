import React from 'react'
import logo from '../../assets/img/logo.png'

function HeaderPortfolio() {
    return (
        <header className='header header__portfolio'>
            <span className='section__bigtitle'>Thuyen</span>
            <img className='logo' src={logo} alt='LA'/>
        </header>
    )
}

export default HeaderPortfolio
