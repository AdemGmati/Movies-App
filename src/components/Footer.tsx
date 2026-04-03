import React from 'react';
import { FaTelegram, FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

type FooterGroup = {
  heading: string;
  links: string[];
};

const footerGroups: FooterGroup[] = [
  { heading: 'Home', links: ['Categories', 'Devices', 'Pricing', 'FAQ'] },
  { heading: 'Movies', links: ['Genres', 'Trending', 'New Release', 'Popular'] },
  { heading: 'Shows', links: ['Genres', 'Trending', 'New Release', 'Popular'] },
  { heading: 'Support', links: ['Contact Us'] },
  { heading: 'Subscription', links: ['Plans', 'Features'] },
];

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/', icon: <FaTelegram size={22} /> },
  { label: 'X', href: 'https://x.com/', icon: <FaXTwitter size={22} /> },
];

const legalLinks = ['Terms of Use', 'Privacy Policy', 'Cookie Policy'];

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Navigation Sections */}
        <div className="footer-grid">
          {footerGroups.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className="footer-column">
              <h2 className="footer-heading">{group.heading}</h2>
              <ul className="footer-list">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="/" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Social Icons */}
          <section className="footer-column footer-social-column" aria-label="Connect With Us">
            <h2 className="footer-heading">Connect With Us</h2>
            <div className="footer-social-list">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-link"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Copyright Bar */}
        <div className="footer-bottom">
          <p className="footer-copy">@2024, All Rights Reserved</p>
          <nav aria-label="Legal links">
            <ul className="footer-legal-list">
              {legalLinks.map((link) => (
                <li key={link} className="footer-legal-item">
                  <a href="/" className="footer-legal-link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
