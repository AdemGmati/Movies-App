import './Contact.css';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Contact() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />  
            <main className="contact-page flex-1">
                <div className="contact-header">
                    <h1 className="contact-heading">
                        Get in Touch with <span className="text-red">MovieWatch</span>
                    </h1>
                    <p className="contact-subheading">
                        ave questions, feedback, or just want to say hello? Reach out to the MovieWatch team!
                        We're here to assist you with any inquiries or concerns you may have.
                        Contact us today and let's chat about all things movies!
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Contact Info Section */}
                    <section className="contact-info">
                        <h2 className="info-heading">
                            <span className="text-red">Contact</span> Information
                        </h2>
                        <div className="info-description">
                            <p>
                                Got questions or suggestions? Get in touch with MovieWatch! Email us for a quick reply,
                                call us for a personal chat, or connect on social media for updates.
                            </p>
                            <p>Your feedback counts!</p>
                            <p>Alternatively, you can fill out our form, and we'll connect with you soon!</p>
                        </div>

                        <ul className="info-list">
                            <li className="info-item">
                                <div className="icon-wrapper">
                                    <Phone className="contact-icon" />
                                </div>
                                <span className="item-text">+1012 3294 173</span>
                            </li>

                            <li className="info-item">
                                <div className="icon-wrapper">
                                    <Mail className="contact-icon" />
                                </div>
                                <span className="item-text">MovieWatch@gmail.com</span>
                            </li>

                            <li className="info-item">
                                <div className="icon-wrapper">
                                    <MapPin className="contact-icon" />
                                </div>
                                <span className="item-text">384 Dartmouth Street Boston, Massachusetts 72556{'\n'}United States</span>
                            </li>
                        </ul>

                        <div className="contact-socials">
                            <a href="#" className="social-btn" aria-label="Telegram">
                                <FaTelegramPlane className="social-icon" />
                            </a>
                            <a href="#" className="social-btn" aria-label="X">
                                <FaXTwitter className="social-icon" />
                            </a>
                        </div>
                    </section>

                    {/* Contact Form Section */}
                    <section className="contact-form">
                        <form>
                            <div className="flex flex-col gap-5">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" id="name" className="form-input" placeholder="Enter your email" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" id="email" className="form-input" placeholder="Enter your email" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject" className="form-label">Subject</label>
                                    <input type="text" id="subject" className="form-input" placeholder="Enter your email" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea id="message" className="form-textarea" placeholder="Enter your email"></textarea>
                                </div>
                            </div>

                            <button type="submit" className="submit-btn border-none">
                                Send
                            </button>
                        </form>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}