import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    
    fetch(`${import.meta.env.VITE_API_BASE_URL}/groups`) 
      .then(res => res.json())
      .then(data => {
        const match = data.find(g => g._id === id);
        setGroup(match);

        if (match && new Date(match.startDate) < new Date()) {
          setIsExpired(true);
        }
      });
  }, [id]);

  const handleJoin = () => {
    // Replace with real API call to join
    toast.success("You've joined the group!");
  };

  if (!group) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <img src={group.imageUrl} alt={group.groupName} className="w-full rounded-md mb-6" />
      <h2 className="text-3xl font-bold mb-2">{group.groupName}</h2>
      <p className="text-gray-600 mb-4">{group.description}</p>
      <div className="mb-4">
        <p><strong>Category:</strong> {group.category}</p>
        <p><strong>Location:</strong> {group.location}</p>
        <p><strong>Max Members:</strong> {group.maxMembers}</p>
        <p><strong>Start Date:</strong> {new Date(group.startDate).toLocaleDateString()}</p>
        <p><strong>Organizer:</strong> {group.createdBy?.name} ({group.createdBy?.email})</p>
      </div>

      {isExpired ? (
        <div className="text-red-600 font-semibold">This group is no longer active.</div>
      ) : (
        <button onClick={handleJoin} className="btn btn-primary">Join Group</button>
      )}
    </div>
  );
};

export default GroupDetails;
