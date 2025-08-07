import { useEffect, useState } from "react";
import { Link } from "react-router";

const AllGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    
    fetch(`${import.meta.env.VITE_API_BASE_URL}/groups`)
      .then((res) => res.json())
      .then((data) => setGroups(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <h2 className="text-3xl font-bold text-center mb-6">All Hobby Groups</h2>
      {groups.length === 0 ? (
        <p className="text-center">No groups available.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group._id} className="card bg-base-100 shadow-md">
              <figure><img src={group.imageUrl} alt={group.groupName} className="h-48 w-full object-cover" /></figure>
              <div className="card-body">
                <h3 className="card-title">{group.groupName}</h3>
                <p className="text-sm text-gray-600">{group.category}</p>
                <p>{group.description?.slice(0, 60)}...</p>
                <div className="card-actions justify-end">
                  <Link to={`/group/${group._id}`} className="btn btn-sm btn-primary">See More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllGroups;
