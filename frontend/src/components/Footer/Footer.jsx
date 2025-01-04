/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img className='logo' src={assets.logo} alt=""/>
                <p>This application is protected by copyright laws and international treaty provisions. Unauthorized reproduction or distribution of this application, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.</p>
                    <div className='footer-socials-icons'>
                    <img src={assets.facebook_icon} alt=""/>
                <img src={assets.twitter_icon}  alt=""/>
                <img src={assets.linkedin_icon} alt=""/>
            </div>
            </div>
            <div className="footer-content-center">
               <h2>Company</h2>
               <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>privacy policy</li>
               </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>+91-9480254409</li>
                    <li>help@darshanp.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2024 darshanp.com.All rights reserved</p>
    </div>
  )
}

export default Footer