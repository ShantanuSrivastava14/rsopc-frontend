export default function Table({
  users,
  setUserIds,
  userIds,
  onEdit,
  onDelete,
}) {
  const pushUserIds = (id) => {
    if (userIds.includes(id)) {
      setUserIds(userIds.filter((userId) => userId !== id));
    } else {
      setUserIds([...userIds, id]);
    }
  };

  const handleEdit = (user) => {
    onEdit(user); // Pass the user data to the parent component
  };

  const handleDelete = (userId) => {
    onDelete(userId); // Pass the user ID to the parent component
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Select
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Serial Number
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Phone Number
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Hobbies
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user, index) => (
          <tr key={user._id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <input
                type="checkbox"
                onChange={() => pushUserIds(user._id)}
                checked={userIds.includes(user._id)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.phoneNumber}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.hobbies.join(", ")}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                onClick={() => handleEdit(user)}
                className="text-indigo-600 hover:text-indigo-900 mr-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
