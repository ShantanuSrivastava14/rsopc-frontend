import { useEffect, useState } from "react";

export default function Form({
  onSubmit,
  initialData,
  visible,
  setVisible,
  fetchUsers,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      phoneNumber: "",
      email: "",
      hobbies: "",
    }
  );

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // Call the onSubmit function passed from the parent
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      hobbies: "",
    });
    fetchUsers(); // Fetch users after form submission
    setVisible(false); // Close the form after submission
  };

  const handleClose = () => {
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      hobbies: "",
    });
    setVisible(false); // Close the form without submission
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        visible ? "block" : "hidden"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="text-3xl font-bold mb-4 self-center text-center">
              Add New User
            </h1>
            <form onSubmit={handleSubmit} className="p-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData?.name}
                onChange={handleChange}
                className="mb-4 w-full border rounded-md p-2"
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData?.phoneNumber}
                onChange={handleChange}
                className="mb-4 w-full border rounded-md p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData?.email}
                onChange={handleChange}
                className="mb-4 w-full border rounded-md p-2"
              />
              <input
                type="text"
                name="hobbies"
                placeholder="Hobbies (comma-separated)"
                value={formData?.hobbies}
                onChange={handleChange}
                className="mb-4 w-full border rounded-md p-2"
              />
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ml-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
