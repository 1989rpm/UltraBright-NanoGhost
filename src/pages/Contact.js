import { useState } from 'react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import bgrnd from '../assets/backs.png'
import axiosInstance from '../api/axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '',message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setError('');
      // Send form data to backend
      await axiosInstance.post('contact/', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }   
    catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <div className="relative h-[300px] sm:h-[300px] overflow-hidden">
        <img
            src={bgrnd}
            alt= "background"
            className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 bg-black bg-opacity-30 flex flex-col items-center justify-center h-full text-white px-4">
          {/* Heading */} 
          <h1 className="font-semibold text-center leading-tight text-[45px] sm:text-[45px] md:text-[60px] lg:text-[70px] xl:text-[70px]">
            We'd be happy to hear from you!
          </h1>
        </div>
      </div>

      <div>
        <div className=" flex items-start justify-center px-4 lg:py-10">
          <div className="bg-gray-100 px-6 py-10 rounded-3xl shadow-md max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Map */}
            <div className="w-full h-[250px] md:h-full rounded-2xl overflow-hidden">
              <iframe
                title="MINT Lab Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3000!2d82.993892!3d25.2584737!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e317feb69f3f9%3A0x81d67c16821da3e1!2sSchool%20of%20Biochemical%20Engineering!5e0!3m2!1sen!2sin!4v1751617550350!5m2!1sen!2sin"
                className="w-full h-full border-0 rounded-2xl"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1b4b] mb-6 sm:mb-8">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400 py-2 px-1 bg-transparent focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400 py-2 px-1 bg-transparent focus:outline-none"
                />
                <textarea
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400 py-2 px-1 bg-transparent focus:outline-none resize-none"
                  rows="1"
                ></textarea>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400 py-2 px-1 bg-transparent focus:outline-none resize-none"
                  rows="4"
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#1e1b4b] text-white px-6 py-2 rounded-full hover:bg-[#111827] transition-all"
                >
                  Submit
                </button>
              </form>
              {error && <p className="text-red-500 mt-3">{error}</p>}
              {submitted && !error && (
                <p className="mt-4 text-green-600 font-semibold">
                  Thank you for contacting us! We'll get back to you soon.
                </p>
              )}
            </div>

            {/* Contact Details */}
            <div className="flex flex-col justify-between">
              <div className="space-y-4 text-[18px] sm:text-[20px] text-gray-800">
                <p><strong>Call us at:</strong><br />📞 +91 83900 06189</p>
                <p>
                  <strong>Visit us at:</strong><br />
                  Room No. S 01, Second Floor<br />
                  School of Biochemical Engineering<br />
                  Indian Institute of Technology (BHU), Varanasi<br />
                  221005, India
                </p>
              </div>

              <div className="flex gap-5 mt-8 md:mt-0 text-[#1e1b4b]">
                <a href="https://www.linkedin.com/in/rajendraprasad89/" target="_blank" rel="noreferrer">
                  <FaLinkedin size={30} />
                </a>
                <a href="https://x.com/1989rpm?lang=en" target="_blank" rel="noreferrer">
                  <FaXTwitter size={30} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
