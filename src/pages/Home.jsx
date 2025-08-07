import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/groups`)
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Banner */}
      <div className="carousel w-full h-[600px] mb-10">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://i.postimg.cc/CLnN2zKF/banner-1.png"
            className="w-full h-full object-cover"
            alt="Banner 1"
          />
          <a href="#slide2" className="btn btn-circle absolute right-5 top-1/2">
            ❯
          </a>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://i.postimg.cc/dVMBcw7G/banner-2.png"
            className="w-full h-full object-cover"
            alt="Banner 2"
          />
          <a href="#slide3" className="btn btn-circle absolute right-5 top-1/2">
            ❯
          </a>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://i.postimg.cc/GmkjcVYV/banner-3.png"
            className="w-full h-full object-cover"
            alt="Banner 3"
          />
          <a href="#slide1" className="btn btn-circle absolute right-5 top-1/2">
            ❯
          </a>
        </div>
      </div>

      {/* Featured Groups */}
      <section className="max-w-6xl mx-auto px-4 my-10">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Groups</h2>
        {loading ? (
          <div className="text-center my-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : groups.length === 0 ? (
          <p className="text-center text-gray-500">No groups available.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {groups.slice(0, 6).map((group) => (
              <div key={group._id} className="card bg-base-100 shadow-md">
                <figure>
                  <img
                    src={group.imageUrl}
                    alt={group.groupName}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{group.groupName}</h3>
                  <p className="text-sm text-gray-600">{group.category}</p>
                  <p>{group.description?.slice(0, 60)}...</p>
                  <div className="card-actions justify-end">
                    <Link
                      to={`/group/${group._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      See More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Static Section 1 */}
      <section className="bg-base-200 py-14">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Why Join HobbyHub?</h2>
          <p className="text-lg leading-relaxed mb-6">
            HobbyHub is more than a platform — it's a community. Connect with
            people who share your passions, join exciting events, and build
            lasting friendships. Whether you're a seasoned expert or just
            starting out, there's a place for you here.
          </p>
          <div className="text-xl font-semibold">
            <span className="text-primary">Find your tribe in </span>
            <span className="text-secondary">
              <Typewriter
                words={[
                  "Painting 🎨",
                  "Hiking 🥾",
                  "Gaming 🎮",
                  "Cooking 👩‍🍳",
                  "Photography 📸",
                  "Writing ✍️",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </div>
        </div>
      </section>

      {/* Static Section 2 */}
      <section className="py-14 bg-base-100">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Popular Hobby Categories</h2>
          <p className="text-lg mb-6 text-gray-500">
            Browse some of the most popular hobbies our community loves to
            engage in:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-base-content">
            {[
              "Drawing & Painting",
              "Photography",
              "Video Gaming",
              "Writing & Blogging",
              "Cooking & Baking",
              "Hiking & Running",
              "Music & Instruments",
              "DIY & Crafts",
            ].map((hobby) => (
              <div
                key={hobby}
                className="badge badge-outline text-base p-4 rounded-lg"
              >
                {hobby}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
