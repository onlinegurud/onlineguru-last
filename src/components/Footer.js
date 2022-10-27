import { React } from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
  return (
    <div>
      <div class="footer">
        <div class="footer-grid">
          <div class="footer-content">
            <h3 class="fc-h">ONLINE GURU</h3>
            <Link to="/home">
              <h5 class="fc-b">ABOUT US</h5>
            </Link>
            <Link to="/facilities">
              <h5 class="fc-b">FACILITIES</h5>
            </Link>
            <Link to="/contactus">
              <h5 class="fc-b">CONTACT US</h5>
            </Link>
            <Link to="/">
              <h5 class="fc-b">LOGIN</h5>
            </Link>
          </div>
          <div class="footer-content">
            <h3 class="fc-h">MEDIA</h3>
            <h5 class="fc-b">Press Releases</h5>
            <h5 class="fc-b">
              <a href="https://www.instagram.com/onlineguru_/">Instagram</a>
            </h5>
            <h5 class="fc-b">
              <a href="https://www.facebook.com/">Facebook</a>
            </h5>
            <h5 class="fc-b">
              <a href="https://twitter.com/login">Twitter</a>
            </h5>
          </div>
          <div class="footer-content">
            <h3 class="fc-h">CONTACT</h3>
            <Link to="/contactus">
              <h5 class="fc-b">Office</h5>
            </Link>
            <a aria-label="Chat on WhatsApp" href="https://wa.me/8220581297">
              <h5 class="fc-b">Buissiness Query</h5>
            </a>
          </div>
          <div class="footer-content">
            <h3 class="fc-h">POLICY</h3>
            <Link to="/termsandconditions">
              <h5 class="fc-b">Terms and Conditions</h5>
            </Link>
            <Link to="/privacy">
              <h5 class="fc-b">Privacy Policy</h5>
            </Link>
            <Link to="/refund">
              <h5 class="fc-b">Refund Policy</h5>
            </Link>
          </div>
        </div>
        <div class="footer-end">
          <p class="fe-txt">
            Thank you. We hope your experience was excellent and we can’t wait to see you again
            soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
