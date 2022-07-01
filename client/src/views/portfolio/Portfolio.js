import React from 'react'
import BodyPortfolio from '../../layouts/body/BodyPortfolio'
import FooterPortfolio from '../../layouts/footer/FooterPortfolio'
import HeaderPortfolio from '../../layouts/header/HeaderPortfolio'

function Portfolio() {
    return (
        <div className='portfolio' id='portfolio'>
            <HeaderPortfolio/>
            <BodyPortfolio/>
            {/* <FooterPortfolio/> */}
        </div>
    )
}

export default Portfolio
