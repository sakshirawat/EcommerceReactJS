import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-md font-sans text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-gray-900">
        Privacy Policy
      </h1>

      <p className="text-base sm:text-lg leading-relaxed text-gray-600">
        Soroto is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
      </p>

      <h2 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">
        Information Collection
      </h2>
      <p className="text-base sm:text-lg leading-relaxed text-gray-600">
        We collect information you provide when you register, purchase, or contact us.
      </p>

      <h2 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">
        Use of Information
      </h2>
      <p className="text-base sm:text-lg leading-relaxed text-gray-600">
        Your data is used to provide and improve our services, process transactions, and communicate with you.
      </p>

      <h2 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">
        Data Security
      </h2>
      <p className="text-base sm:text-lg leading-relaxed text-gray-600">
        We use appropriate security measures to protect your information.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
