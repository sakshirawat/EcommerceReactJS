import React from 'react';

const TermsAndCondition = () => {
  return (
    <div className="max-w-full sm:max-w-3xl mx-auto my-8 p-4 md:p-8 bg-white rounded-lg shadow-md font-sans text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900">Terms & Conditions</h1>

      <p className="text-sm sm:text-base leading-relaxed text-gray-600">
        Welcome to Soroto. By using our website, you agree to comply with and be bound by the following terms and conditions.
      </p>

      <h2 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Use of the Site</h2>
      <p className="text-sm sm:text-base leading-relaxed text-gray-600">
        You agree to use the site only for lawful purposes and in a way that does not infringe the rights of others.
      </p>

      <h2 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Intellectual Property</h2>
      <p className="text-sm sm:text-base leading-relaxed text-gray-600">
        All content on this site, including logos and images, are our property or used with permission.
      </p>

      <h2 className="text-lg sm:text-xl font-semibold mt-6 mb-2 text-gray-800">Limitation of Liability</h2>
      <p className="text-sm sm:text-base leading-relaxed text-gray-600">
        We are not liable for any damages arising from the use of this website.
      </p>

      {/* Add more sections as needed */}
    </div>
  );
};

export default TermsAndCondition;
