import { useEffect, useState } from 'react';
import Logo from "../../assets/logo.png";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (event) => {
    event.preventDefault();
    const target = event.target.getAttribute('href');
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="font-sans">
      <div className="bg-gradient-to-br from-white via-white to-blue-400">
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src={Logo} alt="FutureHire" />
              </div>
              <div className="hidden md:flex items-center">
                <a href="#hero" onClick={handleNavLinkClick} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a>
                <a href="#features" onClick={handleNavLinkClick} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Features</a>
                <a href="#testimonials" onClick={handleNavLinkClick} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Testimonials</a>
                <a href="#faq" onClick={handleNavLinkClick} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">FAQ</a>
                <a href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Login</a>
                <a href="/register" className="ml-4 px-4 py-2 rounded-full text-sm font-medium text-white bg-black hover:bg-gray-800">SIGN UP</a>
              </div>
              <div className="md:hidden flex items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#hero" onClick={handleNavLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a>
              <a href="#features" onClick={handleNavLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Features</a>
              <a href="#testimonials" onClick={handleNavLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Testimonials</a>
              <a href="#faq" onClick={handleNavLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">FAQ</a>
              <a href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Login</a>
              <a href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black hover:bg-gray-800">SIGN UP</a>
            </div>
          </div>
        </nav>

        <section id="hero" className="min-h-screen flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Don't Go It Alone<br />
              <span className="text-5xl md:text-7xl font-extrabold">Let AI Be Your Co-Pilot</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Land interviews faster with our AI! Get tailored job matches,<br />
              personalized resumes, and cover letters in under a minute!
            </p>
            <a href="#" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition duration-300">
              Try for Free
            </a>
          </div>
        </section>
      </div>

      <section id="features" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Discover our key features that empower your job search</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-110">
              <h3 className="text-xl font-semibold mb-2">AI Job Matching</h3>
              <p>Advanced AI algorithms that find the perfect job for you.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-110">
              <h3 className="text-xl font-semibold mb-2">Resume Analysis</h3>
              <p>Get feedback on how to optimize your resume for success.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-110">
              <h3 className="text-xl font-semibold mb-2">Job Alerts</h3>
              <p>Receive notifications for the latest jobs that match your profile.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-gray-100 py-16 px-4 rounded-3xl rounded-tl-none">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-110">
              <p className="mb-4">"Thanks to FutureHire, I landed my dream job in less than a month!"</p>
              <h5 className="font-semibold">- Sarah M.</h5>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-110">
              <p className="mb-4">"The AI features made job searching so much easier!"</p>
              <h5 className="font-semibold">- John D.</h5>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-110">
              <p className="mb-4">"I love how personalized my job matches are!"</p>
              <h5 className="font-semibold">- Emily R.</h5>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { question: "What is FutureHire?", answer: "FutureHire is an AI-powered job board that helps users find tailored job matches, optimize their resumes, and provides job alerts." },
              { question: "How does AI help with job matching?", answer: "Our AI algorithms analyze your profile and match you with job opportunities that fit your skills and preferences." },
              { question: "Is there a fee to use FutureHire?", answer: "No, FutureHire is free to use for job seekers." }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <svg
                    className={`h-6 w-6 text-gray-500 transform ${activeFAQ === index ? 'rotate-180' : ''} transition-transform duration-300`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`mt-2 transition-all duration-300 ${
                    activeFAQ === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4 rounded-3xl rounded-tl-none text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Experience a Rapid and Successful Leap into <br />
            Your Next Career
          </h2>
          <a href="#" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition duration-300">
            Try it for Free
          </a>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h5 className="text-lg">
              &copy; 2024 FutureHire<span className="ml-2 bg-gray-700 px-2 py-1 rounded text-sm">AI</span> - All rights reserved.
            </h5>
            <button onClick={() => window.location.href='ContactUs.html'} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

