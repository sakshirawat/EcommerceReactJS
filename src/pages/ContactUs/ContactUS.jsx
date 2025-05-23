import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container max-w-xl mx-auto my-8 p-6 sm:p-8 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl sm:text-3xl mb-6 text-center text-gray-800 font-semibold">Contact Us</h1>

      {submitted ? (
        <p className="text-center text-lg text-green-700">Thank you for reaching out! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-600" htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 text-base sm:text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-600" htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 text-base sm:text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-600" htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-2 text-base sm:text-lg border-2 border-gray-300 rounded-md resize-y focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md text-base sm:text-lg cursor-pointer hover:bg-blue-800 transition-colors"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
