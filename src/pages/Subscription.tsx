import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Plans from "../components/Plans";
import "./Subscription.css";

function Subscription() {
    return (
        <>
            <Navbar />
                <main className="subscription-main">
                    {/* Header Section */}
                    <header className="subscription-header">
                        <h1 className="subscription-title">
                            Unlock <span className="subscription-highlight">Unlimited</span> Entertainment
                        </h1>
                        <p className="subscription-description">
                            : Subscribe to MovieWatch Plus and unlock a world of unlimited entertainment. Enjoy access to our extensive library of movies, exclusive content, and personalized recommendations. Dive into a cinematic adventure like never before!
                        </p>
                    </header>
                    
                    {/* Plans Section */}
                    <section className="subscription-plans-section">
                        <Plans />
                    </section>
                </main>
            <Footer />
        </>
    );
}

export default Subscription;