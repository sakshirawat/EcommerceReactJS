import React from 'react';

const Settings = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '1rem' }}>
      <h1>Settings</h1>
      <section>
        <h2>Profile Settings</h2>
        <p>Update your personal info here.</p>
        {/* Add forms to edit name, email, address, etc. */}
      </section>

      <section>
        <h2>Change Password</h2>
        <p>Update your account password here.</p>
        {/* Add password change form */}
      </section>

      <section>
        <h2>Notification Preferences</h2>
        <p>Manage how you receive notifications.</p>
        {/* Add toggles or checkboxes */}
      </section>

      <section>
        <h2>Privacy Settings</h2>
        <p>Control your profile visibility and data sharing.</p>
        {/* Add privacy controls */}
      </section>

      <section>
        <h2>Delete Account</h2>
        <button>Delete My Account</button>
      </section>
    </div>
  );
};

export default Settings;
