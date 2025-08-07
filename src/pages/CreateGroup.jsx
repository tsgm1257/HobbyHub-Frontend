import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const CreateGroup = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    groupName: "",
    category: "",
    description: "",
    location: "",
    maxMembers: "",
    startDate: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGroup = {
      ...formData,
      createdBy: {
        name: user.displayName,
        email: user.email,
      },
    };

    fetch(`${import.meta.env.VITE_API_BASE_URL}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGroup),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Group created successfully!");
        setFormData({
          groupName: "",
          category: "",
          description: "",
          location: "",
          maxMembers: "",
          startDate: "",
          imageUrl: "",
        });
      })
      .catch((err) => {
        toast.error("Failed to create group");
        console.error(err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-md bg-base-200 rounded-xl my-10">
      <h2 className="text-3xl font-bold text-center mb-6">Create a New Group</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="label">Group Name</label>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            placeholder="Group Name"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Hobby Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>Select Hobby Category</option>
            <option>Drawing & Painting</option>
            <option>Photography</option>
            <option>Video Gaming</option>
            <option>Fishing</option>
            <option>Running</option>
            <option>Cooking</option>
            <option>Reading</option>
            <option>Writing</option>
          </select>
        </div>

        <div>
          <label className="label">Meeting Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Meeting Location"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Max Members</label>
          <input
            type="number"
            name="maxMembers"
            value={formData.maxMembers}
            onChange={handleChange}
            placeholder="Max Members"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Your Name</label>
          <input
            type="text"
            value={user.displayName}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div>
          <label className="label">Your Email</label>
          <input
            type="email"
            value={user.email}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Group Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Group Description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary md:col-span-2">
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
