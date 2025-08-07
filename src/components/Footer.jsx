import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Left: Brand Info */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">HobbyHub</h2>
          <p className="mb-2">Connect through passions. Build your circle.</p>
          <p className="text-sm">© {new Date().getFullYear()} HobbyHub. All rights reserved.</p>
        </div>

        {/* Center: Quick Links */}
        <div className="md:ml-32">
          <h6 className="footer-title  mb-2">Quick Links</h6>
          <ul className="space-y-1">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/groups" className="link link-hover">All Groups</Link></li>
            <li><Link to="/createGroup" className="link link-hover">Create Group</Link></li>
            <li><Link to="/myGroups" className="link link-hover">My Groups</Link></li>
          </ul>
        </div>

        {/* Right: Legal */}
        <div className="md:text-right">
          <h6 className="footer-title mb-2">Legal</h6>
          <ul className="space-y-1">
            <li><a href="#" className="link link-hover">Terms of Use</a></li>
            <li><a href="#" className="link link-hover">Privacy Policy</a></li>
            <li><a href="#" className="link link-hover">Cookie Policy</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
