import React from 'react'
import { Link } from 'react-router-dom'
import cv_en from '../../assets/cv/CV-Nong-Trong-Thuyen.pdf'
import cv_vi from '../../assets/cv/Nong-Trong-Thuyen-CV.pdf'
import logo from '../../assets/img/logo.png'

function BodyPortfolio() {
    return (
        <div className='container v2'>

            {/* HOME */}
            <section className='section' id='home'>
                <span className='home--greeting'>Hi, I'm</span>
                <h2 className='home--name'>
                    Trong Thuyen
                </h2>
                <span className='home--education'>
                    Intern Front-End Web Developer
                </span>
                <div className='home--button'>
                    <a href={cv_en} download className='btn btn-home btn-ghost'>Download CV</a>
                    <a href='#about' className='btn btn-home'>About me</a>
                </div>
                <div className='home--img'>
                    <img src={logo} alt='Cover'/>
                </div>
            </section>

            {/* ABOUT ME */}
            <section className='section' id='about'>
                <span className='section__subtitle'>My Intro</span>
                <h2 className='section__title'>About me</h2>

                <div className='about__content'>
                    <div className='about__img'>
                        <img src={logo} alt='img'/>
                    </div>
                    <div className='about__infor'>
                        <div className='about__infor--1'>
                            <p><strong>Fullname:</strong> Nông Trọng Thuyên</p>
                            <p><strong>Birthday:</strong> 26 - 06 - 2001</p>
                            <p><strong>Education:</strong> The 3rd student of Ho Chi Minh city University of Technology</p>
                            <p><strong>Major:</strong> Computer Engerneering</p>
                        </div>
                        <div className='about__infor--2'>
                            <div className='about__box'>
                                <i class='bx bx-award about__icon'></i>
                                <h4 className='about__title'>Experience</h4>
                                <span className='about__subtitle'>0 year</span>
                            </div>
                            <div className='about__box'>
                                <i class='bx bx-briefcase-alt about__icon' ></i>
                                <h4 className='about__title'>Projects</h4>
                                <span className='about__subtitle'>0 project</span>
                            </div>
                            <div className='about__box'>
                                <i class='bx bx-certification about__icon' ></i>
                                <h4 className='about__title'>Certification</h4>
                                <span className='about__subtitle'>...</span>
                            </div>
                        </div>
                        <div className='about__objective'>
                            <p>Frontend developer, I create web pages with UI / UX user interface, I have years of experience and many clients are happy with the projects carried out.</p>
                        </div>
                        <div className='about__btn'>
                            <a href='#' className='btn btn-home'>Contact me</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className='section' id='#certifications'>
                <span className='section__subtitle'>My Level</span>
                <h2 className='section__title'>Certifications</h2>
            </section>

            {/* My Experience */}
            <section className='section' id='#experience'>
                <span className='section__subtitle'>My Abilities</span>
                <h2 className='section__title'>Experience</h2>
            </section>

            {/* Skills */}
            <section className='section' id='#skills'>
                <span className='section__subtitle'>My Knowledge</span>
                <h2 className='section__title'>Skills</h2>
            </section>

            {/* Projects */}
            <section className='section' id='#projects'>
                <span className='section__subtitle'>My Projects</span>
                <h2 className='section__title'>Done Projects</h2>
            </section>

            {/* Jobs */}
            <section className='section' id='#jobs'>
                <span className='section__subtitle'>My Projects</span>
                <h2 className='section__title'>Recent Jobs</h2>
            </section>

            {/* Contact */}
            <section className='section' id='#contact'>
                <span className='section__subtitle'>You can</span>
                <h2 className='section__title'>Contact me</h2>
            </section>
        </div>
    )
}

export default BodyPortfolio
