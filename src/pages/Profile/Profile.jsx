import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    dispatch(userActions.updateUser(formData));
    setEditMode(false);
  };

  if (!user) {
    return (
      <div className="max-w-full sm:max-w-xl mx-auto p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl mb-4 font-semibold">My Profile</h1>
        <p className="italic text-gray-600 text-base sm:text-lg">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-full sm:max-w-xl mx-auto p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl mb-4 font-semibold">My Profile</h1>

      {editMode ? (
        <div>
          <label className="block mt-3 text-base sm:text-lg">
            Name:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-base sm:text-lg border border-gray-300 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block mt-3 text-base sm:text-lg">
            Email:
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="w-full p-2 mt-1 text-base sm:text-lg border border-gray-300 rounded-md box-border bg-gray-100 cursor-not-allowed"
            />
          </label>

          <label className="block mt-3 text-base sm:text-lg">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-base sm:text-lg border border-gray-300 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="block mt-3 text-base sm:text-lg">
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 mt-1 text-base sm:text-lg border border-gray-300 rounded-md box-border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block mt-3 text-base sm:text-lg">
            Address:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 mt-1 text-base sm:text-lg border border-gray-300 rounded-md box-border resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition text-base sm:text-lg"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition text-base sm:text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-base sm:text-lg">
          <p className="my-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="my-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="my-2">
            <strong>Gender:</strong> {user.gender || "Not specified"}
          </p>
          <p className="my-2">
            <strong>Date of Birth:</strong> {user.dob || "Not specified"}
          </p>
          <p className="my-2">
            <strong>Address:</strong> {user.address || "Not specified"}
          </p>

          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md mt-4 hover:bg-blue-700 transition text-base sm:text-lg"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
