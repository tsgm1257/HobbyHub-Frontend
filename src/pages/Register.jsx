import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLong = password.length >= 6;
    return hasUpper && hasLower && isLong;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, photoURL, email, password } = formData;

    if (!validatePassword(password)) {
      toast.error(
        "Password must have an uppercase, a lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    register(email, password)
      .then((result) =>
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        })
      )
      .then(() => {
        toast.success("Registered successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 shadow-md rounded-xl bg-base-200">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            value={formData.photoURL}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a className="text-blue-600" href="/login">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
