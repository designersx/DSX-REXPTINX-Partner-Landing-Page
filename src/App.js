import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useParams } from "react-router-dom";

// -----------------------------
// SVG Icon Components (vector graphics)
// -----------------------------
const BotBadge = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect rx="12" width="64" height="64" fill="#6424EC" />
    <circle cx="32" cy="12" r="6" fill="#FFFFFF" />
    <rect x="30" y="18" width="4" height="8" fill="#FFFFFF" />
    <circle cx="32" cy="36" r="18" fill="#FFFFFF" />
    <rect x="22" y="30" width="20" height="12" rx="6" fill="#6424EC" />
    <rect x="26" y="34" width="4" height="6" rx="2" fill="#FFFFFF" />
    <rect x="34" y="34" width="4" height="6" rx="2" fill="#FFFFFF" />
    <path d="M27 51l-3 9c12 0 21-3 27-8" fill="#FFFFFF" />
  </svg>
);

const Icon24x7 = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="32" cy="32" r="28" stroke="#6424EC" strokeWidth="4" />
    <path d="M32 14v18l12 7" stroke="#6424EC" strokeWidth="4" strokeLinecap="round" />
    <path d="M14 36c0-9.94 8.06-18 18-18" stroke="#C6AFF6" strokeWidth="4" strokeLinecap="round" />
    <text x="22" y="56" fontFamily="Lato, sans-serif" fontWeight="700" fontSize="12" fill="#6424EC">24/7</text>
  </svg>
);

const IconRouting = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M10 16h44M10 32h28M10 48h44" stroke="#6424EC" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="52" cy="16" r="6" fill="#6424EC"/>
    <circle cx="38" cy="32" r="6" fill="#6424EC"/>
    <circle cx="52" cy="48" r="6" fill="#6424EC"/>
    <path d="M46 16l-6 6M44 48l-6-6" stroke="#C6AFF6" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const IconHumanLike = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="32" cy="24" r="12" fill="#6424EC" />
    <rect x="12" y="36" width="40" height="18" rx="9" fill="#6424EC" />
    <circle cx="28" cy="22" r="2.5" fill="#FFFFFF" />
    <circle cx="36" cy="22" r="2.5" fill="#FFFFFF" />
    <path d="M26 28c2.4 2 9.6 2 12 0" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
    <path d="M20 48c10 4 14 4 24 0" stroke="#C6AFF6" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const IconCost = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="64" height="64" rx="14" fill="#F3EEFD" />
    <path d="M32 12v40M20 22h24M20 42h24" stroke="#6424EC" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const IconCX = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="64" height="64" rx="14" fill="#F3EEFD" />
    <circle cx="24" cy="26" r="8" fill="#6424EC" />
    <path d="M40 20h10v24H40l-8 6V14l8 6z" fill="#6424EC" />
  </svg>
);

const IconLeads = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="64" height="64" rx="14" fill="#F3EEFD" />
    <path d="M16 40c8 0 8 8 16 8s8-8 16-8" stroke="#6424EC" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="32" cy="24" r="10" stroke="#6424EC" strokeWidth="4" fill="none" />
    <path d="M32 20v8l4 2" stroke="#6424EC" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const IconSecure = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="64" height="64" rx="14" fill="#F3EEFD" />
    <rect x="18" y="28" width="28" height="20" rx="4" fill="#6424EC" />
    <path d="M24 28v-3a8 8 0 0116 0v3" stroke="#C6AFF6" strokeWidth="3" />
  </svg>
);

// -----------------------------
// Header (sticky) with smooth-scroll nav
// -----------------------------
const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm py-2" role="navigation" aria-label="Primary">
    <div className="container">
      <button className="navbar-brand border-0 bg-transparent d-flex align-items-center gap-2" onClick={() => scroll.scrollToTop({ duration: 500 })}>
        <BotBadge />
        <span className="fw-bold brand-text">Rexpt</span>
      </button>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#rexptNav" aria-controls="rexptNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="rexptNav">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-3">
          <li className="nav-item"><ScrollLink className="nav-link" to="features" smooth duration={500} offset={-80}>Features</ScrollLink></li>
          <li className="nav-item"><ScrollLink className="nav-link" to="benefits" smooth duration={500} offset={-80}>Benefits</ScrollLink></li>
          <li className="nav-item"><ScrollLink className="nav-link" to="testimonials" smooth duration={500} offset={-80}>Testimonials</ScrollLink></li>
          <li className="nav-item ms-lg-2">
            <a className="btn btn-primary rounded-pill px-4 shadow-sm" href="https://rexpt.us/" target="_blank" rel="noreferrer">Get Started</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

// -----------------------------
// Hero Section
// -----------------------------
const HeroSection = () => (
  <header className="hero d-flex align-items-center" id="home" role="banner">
    {/* Web fonts */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Adelle+Sans:wght@400;600;700&display=swap" rel="stylesheet" />

    <div className="container text-center text-white py-5">
      <div className="mx-auto" style={{maxWidth: 860}}>
        <span className="badge text-bg-light text-primary rounded-pill px-3 py-2 mb-3 shadow-sm">AI Receptionist • 24/7</span>
        <h1 className="display-5 fw-black mb-3">Meet Rexpt: Your Business's New Voice.</h1>
        <p className="lead opacity-95 mb-4">Our AI receptionist handles your inbound calls 24/7, so you can focus on what matters most.</p>
        <div className="d-flex gap-3 justify-content-center">
          <a href="https://rexpt.us/" target="_blank" rel="noreferrer" className="btn btn-light btn-lg rounded-pill px-4 fw-semibold shadow hover-lift">Get Started Now</a>
          <ScrollLink to="features" smooth duration={500} offset={-80} className="btn btn-outline-light btn-lg rounded-pill px-4 fw-semibold">Learn More</ScrollLink>
        </div>
      </div>
    </div>
  </header>
);

// -----------------------------
// Feature cards
// -----------------------------
const FeaturesSection = () => (
  <section id="features" className="py-5 section-reveal" aria-label="Why Rexpt is the Right Choice">
    <div className="container">
      <h2 className="text-center fw-black mb-4">Why Rexpt is the Right Choice</h2>
      <p className="text-center text-muted mb-5">Three powerful capabilities to elevate every call.</p>
      <div className="row g-4">
        <FeatureCard Icon={Icon24x7} title="24/7 Call Handling" text="Never miss a call again. Our AI agents greet callers and capture details day or night." />
        <FeatureCard Icon={IconRouting} title="Intelligent Call Routing" text="Efficiently route callers to the right person or workflow—no manual juggling." />
        <FeatureCard Icon={IconHumanLike} title="Human-like Conversations" text="Provide a consistent, professional experience with natural language understanding." />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ Icon, title, text }) => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="card h-100 border-0 shadow-sm hover-lift p-3">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="icon-wrap rounded-3 p-2 bg-primary-subtle d-inline-flex"><Icon /></div>
        <h3 className="h5 fw-bold m-0">{title}</h3>
      </div>
      <p className="text-muted mb-0">{text}</p>
    </div>
  </div>
);

// -----------------------------
// Benefits / Value Proposition
// -----------------------------
const BenefitsSection = () => (
  <section id="benefits" className="py-5 bg-light section-reveal" aria-label="Transform Your Business Operations">
    <div className="container">
      <div className="row align-items-start g-4">
        <div className="col-lg-6">
          <h2 className="fw-black mb-3">Transform Your Business Operations</h2>
          <p className="text-muted">Discover how Rexpt can streamline your customer experience and help your team focus on higher‑value work.</p>
        </div>
        <div className="col-lg-6">
          <BenefitItem Icon={IconCost} title="Cost‑Effective" text="Drastically reduce operational costs compared to traditional receptionists." />
          <BenefitItem Icon={IconCX} title="Improved Customer Experience" text="Deliver consistent, high‑quality interactions that build trust and loyalty." />
          <BenefitItem Icon={IconLeads} title="Lead Nurturing & Analysis" text="Capture every lead and get actionable insights to help your sales team close more deals." />
          <BenefitItem Icon={IconSecure} title="Secure and Reliable" text="Your data and conversations are protected with robust security protocols." />
        </div>
      </div>
    </div>
  </section>
);

const BenefitItem = ({ Icon, title, text }) => (
  <div className="d-flex align-items-start gap-3 mb-4 p-3 rounded-3 bg-white shadow-sm">
    <div className="flex-shrink-0"><Icon /></div>
    <div>
      <h3 className="h6 fw-bold mb-1">{title}</h3>
      <p className="text-muted mb-0">{text}</p>
    </div>
  </div>
);

// -----------------------------
// Testimonials
// -----------------------------
const TestimonialsSection = () => (
  <section id="testimonials" className="py-5 section-reveal" aria-label="What Our Customers Say">
    <div className="container">
      <h2 className="text-center fw-black mb-4">What Our Customers Say</h2>
      <div className="row g-4 justify-content-center">
        <TestimonialCard name="Jane Doe" role="Clinic Manager" quote="Rexpt has completely changed how we manage inbound calls. We’re never missing leads and our patients get answers in seconds." />
        <TestimonialCard name="John Smith" role="Owner, ServiceCo" quote="Thanks to Rexpt, our response time has dropped dramatically, and every call is logged with context for follow‑up." />
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ name, role, quote }) => (
  <div className="col-12 col-md-6 col-lg-5">
    <figure className="card h-100 border-0 shadow-sm p-4">
      <blockquote className="blockquote mb-3">“{quote}”</blockquote>
      <figcaption className="blockquote-footer m-0 d-flex align-items-center gap-2">
        <div className="rounded-circle bg-primary-subtle d-inline-flex p-1" aria-hidden="true"><BotBadge size={20} /></div>
        <span className="fw-semibold">{name}</span>
        <span className="text-muted">— {role}</span>
      </figcaption>
    </figure>
  </div>
);

// -----------------------------
// Final CTA
// -----------------------------
const FinalCTA = () => (
  <section className="py-5 text-center text-white cta-gradient section-reveal">
    <div className="container">
      <h2 className="fw-black mb-2">Ready to Automate Your Calls?</h2>
      <p className="lead mb-4">Join hundreds of businesses already saving time and money with Rexpt.</p>
      <a href="https://rexpt.us/" target="_blank" rel="noreferrer" className="btn btn-light btn-lg rounded-pill px-4 fw-semibold shadow hover-lift">Get Started Today</a>
    </div>
  </section>
);

// -----------------------------
// Partner Contact Info
// -----------------------------
const PartnerContact = ({PARTNER_PHONE,PARTNER_NAME,PARTNER_EMAIL}) => (
  <section className="py-5 bg-white section-reveal" aria-label="Contact Your Rexpt Partner">
    <div className="container">
      <h2 className="text-center fw-black mb-4">Questions? Contact Your Rexpt Partner</h2>
      <div className="row g-4 justify-content-center">
        <ContactCard title="Partner's Name" value={PARTNER_NAME} Icon={() => (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <circle cx="12" cy="7" r="4" fill="#6424EC" /><path d="M4 20c0-4 4-7 8-7s8 3 8 7" fill="#C6AFF6" />
          </svg>
        )} />
        <ContactCard title="Email" value={PARTNER_EMAIL} Icon={() => (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="2" fill="#6424EC" /><path d="M4 7l8 6 8-6" stroke="#C6AFF6" strokeWidth="2" />
          </svg>
        )} />
        <ContactCard title="Phone Number" value={PARTNER_PHONE} Icon={() => (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M6 3h4l2 5-3 2a14 14 0 007 7l2-3 5 2v4c0 1-1 2-2 2C9 22 2 15 2 5c0-1 1-2 2-2z" fill="#6424EC"/>
          </svg>
        )} />
      </div>
    </div>
  </section>
);

const ContactCard = ({ title, value, Icon }) => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="card h-100 border-0 shadow-sm p-4 text-center">
      <div className="mb-3 d-flex justify-content-center"><Icon /></div>
      <h3 className="h6 text-muted mb-1">{title}</h3>
      <p className="fw-bold m-0 selectable">{value}</p>
    </div>
  </div>
);

// -----------------------------
// Footer
// -----------------------------
const Footer = () => (
  <footer className="py-4 border-top bg-white text-center small text-muted">
    <div className="container">© {new Date().getFullYear()} Rexpt. All rights reserved. • <a className="text-decoration-none" href="#" onClick={(e)=>e.preventDefault()}>Terms of Service</a> • <a className="text-decoration-none" href="#" onClick={(e)=>e.preventDefault()}>Privacy Policy</a> • <ScrollLink className="text-decoration-none" to="home" smooth duration={500} offset={-80}>Back to top</ScrollLink></div>
  </footer>
);

// -----------------------------
// Root App + styles & simple reveal-on-scroll
// -----------------------------
export default function App() {
  // const { slug } = useParams();
  const slug = window.location.pathname.split("/").filter(Boolean)[0] || "defaultSlug";
  
const [PARTNER_NAME,setPARTNER_NAME]=useState('')
const [PARTNER_EMAIL,setPARTNER_EMAIL]=useState('')
const [PARTNER_PHONE,setPARTNER_PHONE]=useState('')



const fetchPartnerDetails = async (slug) => {
  try {
    const res = await axios.get(
      // `http://192.168.0.202:2512/api/endusers/getPartnerDetailbyReferalName/Ajaypartners`
      `http://192.168.0.202:2512/api/endusers/getPartnerDetailbyReferalName/${slug}`
    );

    // ✅ Success check
    if (res.status === 200) {
      console.log("✅ Partner details fetched:", res.data);
      setPARTNER_NAME(res.data.name)
      setPARTNER_EMAIL(res.data.email)
      setPARTNER_PHONE(res.data.phone)
      return { success: true, data: res.data };
    } else {
      console.warn("⚠️ Unexpected status:", res.status);
      return { success: false, error: `Unexpected status: ${res.status}` };
    }
  } catch (error) {
    // ❌ Error handling
    console.error("❌ Error fetching partner details:", error);

    if (error.response) {
      // Server responded with a status other than 2xx
      return {
        success: false,
        error: error.response.data || "Server Error",
        status: error.response.status,
      };
    } else if (error.request) {
      // Request made but no response
      return { success: false, error: "No response from server" };
    } else {
      // Something else went wrong
      return { success: false, error: error.message };
    }
  }
};
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("reveal-in");
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.log(slug)
    if (slug) {
      fetchPartnerDetails(slug);
    }
  }, [slug]);

  console.log(slug)

  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FinalCTA />
      <PartnerContact PARTNER_PHONE={PARTNER_PHONE} PARTNER_NAME={PARTNER_NAME} PARTNER_EMAIL={PARTNER_EMAIL}/>
      <Footer />

      {/* Page Styles (scoped to this component) */}
      <style>{`
        :root {
          --rexpt-primary: #6424EC; /* extracted from provided icon */
          --rexpt-primary-700: #4B1AC7;
          --rexpt-primary-50: #F3EEFD; /* light tint used in tiles */
          --rexpt-ink: #1b1b1f;
        }
        * { box-sizing: border-box; }
        body { font-family: 'Adelle Sans', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif; color: var(--rexpt-ink); }
        .brand-text{ font-family: 'Lato', sans-serif; font-weight: 900; font-size: 1.25rem; color: var(--rexpt-primary); }
        .fw-black{ font-family: 'Lato', sans-serif; font-weight: 900; }
        .navbar .nav-link{ cursor: pointer; }
        .btn-primary{ background: var(--rexpt-primary); border-color: var(--rexpt-primary); }
        .btn-outline-light:hover{ color: #111; background: #fff; }
        .bg-primary-subtle{ background: var(--rexpt-primary-50)!important; }
        .text-primary{ color: var(--rexpt-primary)!important; }
        .hero{ background: radial-gradient(1200px 500px at 50% -20%, #9265F0 0%, transparent 60%), linear-gradient(180deg, var(--rexpt-primary) 0%, var(--rexpt-primary-700) 100%); min-height: 78vh; padding-top: 5.25rem; }
        .cta-gradient{ background: linear-gradient(135deg, var(--rexpt-primary-700), var(--rexpt-primary)); }
        .hover-lift{ transition: transform .25s ease, box-shadow .25s ease; }
        .hover-lift:hover{ transform: translateY(-2px); box-shadow: 0 1rem 1.75rem rgba(0,0,0,.12)!important; }
        .icon-wrap svg{ display:block; }
        .selectable{ user-select:text; }
        /* reveal on scroll */
        .section-reveal{ opacity: 0; transform: translateY(12px); transition: opacity .6s ease, transform .6s ease; }
        .section-reveal.reveal-in{ opacity: 1; transform: none; }
        @media (min-width: 992px){ .hero .display-5{ font-size: 3.2rem; } }
      `}</style>
    </>
  );
}
