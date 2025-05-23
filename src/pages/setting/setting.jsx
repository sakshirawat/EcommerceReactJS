import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-full sm:max-w-xl mx-auto mt-8 sm:mt-12 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center sm:text-left">
        Settings
      </h1>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Profile Settings</h2>
        <p className="text-gray-700 text-base sm:text-lg">
          Update your personal info here.
        </p>
        {/* Add forms to edit name, email, address, etc. */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Change Password</h2>
        <p className="text-gray-700 text-base sm:text-lg">
          Update your account password here.
        </p>
        {/* Add password change form */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Notification Preferences</h2>
        <p className="text-gray-700 text-base sm:text-lg">
          Manage how you receive notifications.
        </p>
        {/* Add toggles or checkboxes */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Privacy Settings</h2>
        <p className="text-gray-700 text-base sm:text-lg">
          Control your profile visibility and data sharing.
        </p>
        {/* Add privacy controls */}
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Delete Account</h2>
        <button className="w-full sm:w-auto bg-red-600 text-white px-5 py-3 rounded hover:bg-red-700 transition text-base sm:text-lg">
          Delete My Account
        </button>
      </section>
    </div>
  );
};

export default Settings;
