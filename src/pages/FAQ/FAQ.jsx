import React from 'react';

const FAQ = () => {
  return (
    <div className="bg-white rounded-lg shadow-md font-sans p-4 sm:p-8 max-w-3xl mx-auto my-8">
      <h1 className="text-xl sm:text-2xl font-extrabold mb-6 sm:mb-8 text-center text-gray-800">
        Frequently Asked Questions
      </h1>

      <h3 className="text-base sm:text-lg mt-6 mb-2 text-gray-900 font-semibold">
        1. How do I create an account?
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        You can sign up by clicking the Sign Up button on the homepage and filling out the registration form.
      </p>

      <h3 className="text-base sm:text-lg mt-6 mb-2 text-gray-900 font-semibold">
        2. How can I track my order?
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        After placing an order, you can track it through your profile under "My Orders".
      </p>

      <h3 className="text-base sm:text-lg mt-6 mb-2 text-gray-900 font-semibold">
        3. What payment methods do you accept?
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        We accept major credit cards, debit cards, and PayPal.
      </p>

      <h3 className="text-base sm:text-lg mt-6 mb-2 text-gray-900 font-semibold">
        4. How do I contact customer support?
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        You can reach out via the Contact Us page or email us at info@sorto.com.
      </p>
    </div>
  );
};

export default FAQ;
