import React, { useEffect, useState } from "react";
// import logo from "../../public/logo.webp"; // <-- FIX 1: Removed this import
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // <-- FIX 2: Added loading state

  // Check login status on component mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
        setLoading(false); // <-- FIX 2: Set loading false after fetch
      } catch (error) {
        console.log("Error fetching courses: ", error);
        toast.error("Could not fetch courses.");
        setLoading(false); // <-- FIX 2: Also set loading false on error
      }
    };
    fetchCourses();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error logging out: ", error);
      toast.error(error.response?.data?.errors || "Error logging out");
    }
  };

  // Settings for the react-slick carousel
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950">
      <div className="min-h-screen text-white container mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.webp" // <-- FIX 1: Changed src
              alt="CourseHaven Logo"
              className="w-7 h-7 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="md:text-2xl text-orange-500 font-bold">
              CourseHaven
            </h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Main section */}
        <main>
          <section className="text-center py-20">
            <h1 className="text-4xl font-semibold text-orange-500">
              CourseHaven
            </h1>
            <br />
            <p className="text-gray-400">
              Sharpen your skills with courses crafted by experts.
            </p>
            <div className="space-x-4 mt-8">
              <Link
                to={"/courses"}
                className="bg-green-500 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
              >
                Explore Courses
              </Link>
              <Link
                to={"https://www.youtube.com/c/Freecodecamp"}
                className="bg-white text-black p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white"
              >
                Courses Videos
              </Link>
            </div>
          </section>

          <section className="p-10">
            {/* FIX 2: Added loading/empty state for slider */}
            {loading ? (
              <p className="text-center text-gray-400">Loading courses...</p>
            ) : courses.length > 0 ? (
              <Slider {...settings}>
                {courses.map((course) => (
                  <div key={course._id} className="p-4">
                    <div className="relative flex-shrink-0 w-full transition-transform duration-300 transform hover:scale-105">
                      <div className="bg-gray-900 rounded-lg overflow-hidden">
                        <img
                          className="h-40 w-full object-cover"
                          // Your optional chaining here is perfect!
                          // Just make sure you have 'placeholder.png' in your /public folder
                          src={course?.image?.url || "/placeholder.png"}
                          alt={course.title}
                        />
                        <div className="p-6 text-center">
                          <h2 className="text-xl font-bold text-white h-16">
                            {course.title}
                          </h2>
                          <Link
                            to={`/buy/${course._id}`}
                            className="mt-4 inline-block bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <p className="text-center text-gray-400">
                No courses available at the moment.
              </p>
            )}
          </section>
        </main>

        <hr className="border-gray-700" />

        {/* Footer */}
        <footer className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img
                  src="/logo.webp" // <-- FIX 1: Changed src
                  alt="CourseHaven Logo"
                  className="w-10 h-10 rounded-full"
                />
                <h1 className="text-2xl text-orange-500 font-bold">
                  CourseHaven
                </h1>
              </div>
              <div className="mt-3">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4 justify-center md:justify-start">
                  <a href="#" aria-label="Facebook">
                    <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  YouTube
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Telegram
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  GitHub
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-12">
            <p>copyrights &#169; 2024 CourseHaven</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;