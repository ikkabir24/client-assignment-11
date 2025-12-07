import React from 'react';
import { FaFacebookSquare, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';
import logo from '../../../assets/images/logo-flat.png';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-100 text-base-content p-10">
      <aside>
        {/* Logo */}
        <Link to='/'>
          <img src={logo} alt='logo' width='200' />
        </Link>
        <p className='container md:w-100 text-justify'>LoanLink is a comprehensive microloan management system dedicated to modernizing how NGOs and small financial organizations operate. We replace the chaos of manual paperwork with a unified digital dashboard. Whether you are a borrower looking for quick funds or a manager overseeing disbursements and EMI schedules, LoanLink ensures a secure, fast, and transparent lending experience.</p><br />
        <p>© Designed and Developed by Kabir. All rights reserved.</p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Contact us</h6>
        <p>Email: ikkabir24@yahoo.com</p>
        <p>Phone: +880 1890 995309</p>
        <div className='flex gap-2 items-center'>
          <Link to={'https://www.linkedin.com/in/ikkabir24/'}><span><FaLinkedin className='text-4xl' /></span></Link>
          <Link to={'https://www.facebook.com/ikkabir24'}><span><FaFacebookSquare className='text-4xl' /></span></Link>
          <Link to={'https://x.com/ikkabir24'}><span><FaSquareXTwitter className='text-4xl' /></span></Link>
        </div>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;