import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/groups`)
        .then((res) => res.json())
        .then((data) => {
          const userGroups = data.filter(
            (g) => g.createdBy?.email === user.email
          );
          setGroups(userGroups);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/groups/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Group has been deleted.", "success");
              setGroups((prev) => prev.filter((group) => group._id !== id));
            } else {
              Swal.fire("Error", "Failed to delete group.", "error");
            }
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">My Groups</h2>
      {groups.length === 0 ? (
        <p className="text-center">No groups created yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Group Name</th>
                <th>Start Date</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={group._id}>
                  <td>{index + 1}</td>
                  <td>{group.groupName}</td>
                  <td>{new Date(group.startDate).toLocaleDateString()}</td>
                  <td>{group.location}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/updateGroup/${group._id}`}
                      className="btn btn-xs btn-info"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(group._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
