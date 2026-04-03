import "./Plans.css";

type PlanType = {
    title: string;
    price: string;
    features: string[];
};

const plansData: PlanType[] = [
    {
        title: "Basic Plan",
        price: "$9.99",
        features: [
            "Regular content updates.",
            "Unlimited streaming on one device at a time.",
            "Standard definition (SD) video quality.",
            "Access to a vast library of movies from various genres.",
            "Option to create a personalized watchlist."
        ]
    },
    {
        title: "Standard Plan",
        price: "$14.99",
        features: [
            "All features of the Basic Plan.",
            "HD (High Definition) video quality.",
            "Simultaneous streaming on up to two devices.",
            "Ad-free viewing experience",
            "Offline downloads on mobile devices for selected titles."
        ]
    },
    {
        title: "Premium Plan",
        price: "$19.99",
        features: [
            "All features of the Standard Plan.",
            "Ultra HD (4K) video quality for supported titles.",
            "Simultaneous streaming on up to four devices.",
            "Exclusive access to behind-the-scenes content, director's cuts, and special features.",
            "Priority customer support."
        ]
    }
];

function Plans() {
    return (
        <div className="plans-grid">
            {plansData.map((plan, index) => (
                <article key={index} className="plan-card">
                    {/* Plan Header */}
                    <h2 className="plan-title">{plan.title}</h2>
                    
                    {/* Plan Features */}
                    <ul className="plan-features">
                        {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="plan-feature-item">
                                <span className="plan-feature-dot"></span>
                                <span className="plan-feature-text">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    
                    {/* Plan Pricing */}
                    <div className="plan-pricing">
                        <span className="plan-price">{plan.price}</span>
                        <span className="plan-duration">/month</span>
                    </div>
                    
                    {/* Plan Action */}
                    <button className="plan-button">
                        Choose Plan
                    </button>
                </article>
            ))}
        </div>
    );
}

export default Plans;