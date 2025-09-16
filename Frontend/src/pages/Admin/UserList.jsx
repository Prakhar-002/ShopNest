
/*
?   Node modules
*/
import { useEffect, useState } from "react"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import { toast } from "react-toastify"



/*
?   Custom modules
*/
import Loader from "../../components/Loader"
import Error from "../../components/Error"
import {
      useGetUsersQuery,
      useDeleteUserMutation,
      useGetUserDetailsQuery,
      useUpdateUserMutation
} from "../../redux/api/usersApiSlice";
import AdminMenu from "./AdminMenu"


const UserList = () => {
      const { data: users, refetch, isLoading, error } = useGetUsersQuery()
      const [deleteUser] = useDeleteUserMutation();
      const [updateUser] = useUpdateUserMutation();

      const [editableUserId, setEditableUserId] = useState(null);
      const [editableUserName, setEditableUserName] = useState("");
      const [editableUserEmail, setEditableUserEmail] = useState("");

      useEffect(() => {
            refetch();
      }, [refetch]);

      const deleteHandler = async (id) => {
            if (window.confirm('Are you sure?')) {
                  try {
                        await deleteUser(id);
                        refetch();
                  } catch (error) {
                        toast.error(error?.data?.message || error.error, { theme: 'dark' });
                  }
            }
      }

      const toggleEdit = (id, username, email) => {
            setEditableUserId(id);
            setEditableUserName(username);
            setEditableUserEmail(email);
      };

      const updateHandler = async (id) => {
            try {
                  await updateUser({
                        userId: id,
                        username: editableUserName,
                        email: editableUserEmail,
                  });
                  setEditableUserId(null);
                  refetch();
            } catch (error) {
                  toast.error(error?.data?.message || error.error, { theme: 'dark' });
            }
      }

      return (
            <div className="p-6 min-h-screen bg-gradient-to-br from-black via-[#0f0f10] to-black text-white">
                  <AdminMenu />
                  {isLoading ? (
                        <Loader />
                  ) : error ? (
                        <Error message={`${error?.data?.message || error?.error}`} />
                  ) : (
                        <div className="overflow-x-auto rounded-xl shadow-2xl backdrop-blur-xl border border-pink-800 bg-[#0f0f10]/60 mx-auto max-w-6xl mt-10">
                              <table className="min-w-full divide-y divide-gray-700">
                                    <thead>
                                          <tr className="bg-[#1a1a1d] text-pink-400 text-xs uppercase tracking-widest">
                                                <th className="px-6 py-4 text-left rounded-tl-xl">ID</th>
                                                <th className="px-6 py-4 text-left">Name</th>
                                                <th className="px-6 py-4 text-left">Email</th>
                                                <th className="px-6 py-4 text-left">Admin</th>
                                                <th className="px-6 py-4 text-center rounded-tr-xl">Actions</th>
                                          </tr>
                                    </thead>
                                    <tbody className="text-sm font-medium text-gray-200">
                                          {users.map((user) => (
                                                <tr
                                                      key={user._id}
                                                      className="hover:bg-[#1f1f22]/70 transition duration-300"
                                                >
                                                      <td className="px-6 py-4 font-mono">{user._id.slice(0, 6)}...</td>

                                                      <td className="px-6 py-4">
                                                            {editableUserId === user._id ? (
                                                                  <div className="flex items-center gap-2">
                                                                        <input
                                                                              type="text"
                                                                              value={editableUserName}
                                                                              onChange={(e) => setEditableUserName(e.target.value)}
                                                                              className="bg-black text-white px-3 py-2 rounded-lg border border-pink-600 w-full outline-none focus:ring-2 focus:ring-pink-500"
                                                                        />
                                                                        <button
                                                                              onClick={() => updateHandler(user._id)}
                                                                              className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 shadow-md"
                                                                        >
                                                                              <FaCheck />
                                                                        </button>
                                                                  </div>
                                                            ) : (
                                                                  <div className="flex items-center gap-2">
                                                                        {user.username}
                                                                        <button
                                                                              onClick={() =>
                                                                                    toggleEdit(user._id, user.username, user.email)
                                                                              }
                                                                              className="text-pink-400 hover:text-pink-300"
                                                                        >
                                                                              <FaEdit />
                                                                        </button>
                                                                  </div>
                                                            )}
                                                      </td>

                                                      <td className="px-6 py-4">
                                                            {editableUserId === user._id ? (
                                                                  <div className="flex items-center gap-2">
                                                                        <input
                                                                              type="text"
                                                                              value={editableUserEmail}
                                                                              onChange={(e) => setEditableUserEmail(e.target.value)}
                                                                              className="bg-black text-white px-3 py-2 rounded-lg border border-pink-600 w-full outline-none focus:ring-2 focus:ring-pink-500"
                                                                        />
                                                                        <button
                                                                              onClick={() => updateHandler(user._id)}
                                                                              className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 shadow-md"
                                                                        >
                                                                              <FaCheck />
                                                                        </button>
                                                                  </div>
                                                            ) : (
                                                                  <div className="flex items-center gap-2">
                                                                        <a href={`mailto:${user.email}`} className="text-blue-400 hover:underline">
                                                                              {user.email}
                                                                        </a>
                                                                        <button
                                                                              onClick={() =>
                                                                                    toggleEdit(user._id, user.username, user.email)
                                                                              }
                                                                              className="text-pink-400 hover:text-pink-300"
                                                                        >
                                                                              <FaEdit />
                                                                        </button>
                                                                  </div>
                                                            )}
                                                      </td>

                                                      <td className="px-6 py-4">
                                                            {user.isAdmin ? (
                                                                  <FaCheck className="text-green-500" />
                                                            ) : (
                                                                  <FaTimes className="text-red-500" />
                                                            )}
                                                      </td>

                                                      <td className="px-6 py-4 text-center">
                                                            {!user.isAdmin && (
                                                                  <button
                                                                        onClick={() => deleteHandler(user._id)}
                                                                        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-3 rounded-lg shadow-md"
                                                                  >
                                                                        <FaTrash />
                                                                  </button>
                                                            )}
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  )}
            </div>
      );


}

export default UserList