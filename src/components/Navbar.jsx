import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/groups">All Groups</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/createGroup">Create Group</NavLink>
          </li>
          <li>
            <NavLink to="/myGroups">My Groups</NavLink>
          </li>
        </>
      )}
    </>
  );

  const profileButton = (
    <div
      tabIndex={0}
      role="button"
      className="btn btn-sm btn-circle avatar tooltip tooltip-left"
      data-tip={user?.displayName || "No Name"}
    >
      <div className="w-8 rounded-full">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User" />
        ) : (
          <div className="bg-neutral text-white flex items-center justify-center w-full h-full rounded-full">
            <FaUserAlt />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-primary">
          HobbyHub
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navItems}</ul>
      </div>

      {/* Desktop Right-side Auth + Theme */}
      <div className="navbar-end gap-4 items-center hidden lg:flex">
        <ThemeToggle />
        {!user ? (
          <>
            <NavLink to="/login" className="btn btn-sm">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-sm btn-outline">
              Register
            </NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            {profileButton}
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="dropdown dropdown-end lg:hidden ml-auto">
        <button tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-60"
        >
          {/* Profile Centered at Top */}
          {user && (
            <div className="flex justify-center mb-3">
              <div
                tabIndex={-1}
                className="btn btn-circle avatar tooltip"
                data-tip={user?.displayName || "No Name"}
              >
                <div className="w-12 rounded-full">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" />
                  ) : (
                    <div className="bg-neutral text-white flex items-center justify-center w-full h-full rounded-full">
                      <FaUserAlt />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          {navItems}
          <li>
            <ThemeToggle />
          </li>
          {!user ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
