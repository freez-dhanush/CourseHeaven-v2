import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for sidebar toggle
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Purchases() {
  const [purchases, setPurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // <-- FIX: Initialized to empty string
  const [loading, setLoading] = useState(true); // <-- FIX: Added loading state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token; // using optional chaining to avoid app crashing

  console.log("purchases: ", purchases);

  // Token handling
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!token) {
    navigate("/login");
  }

  // Fetch purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPurchase(response.data.courseData);
        setErrorMessage(""); // <-- FIX: Clear error on success
        setLoading(false); // <-- FIX: Set loading false
      } catch (error) {
        setErrorMessage("Failed to fetch purchase data");
        setLoading(false); // <-- FIX: Set loading false
      }
    };
    fetchPurchases();
  }, [token]); // Added token to dependency array

  // Logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      navigate("/login");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-200"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static transition-transform duration-300 ease-in-out w-64 z-10`}
      >
        <nav>
          <ul className="mt-16 md:mt-0">
            <li className="mb-4">
              <Link to="/" className="flex items-center text-gray-300 hover:text-white">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/courses" className="flex items-center text-gray-300 hover:text-white">
                <FaDiscourse className="mr-2" /> Courses
              </Link>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-blue-400">
                <FaDownload className="mr-2" /> Purchases
              </a>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center text-gray-300 hover:text-white">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="flex items-center text-gray-300 hover:text-white">
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link to="/login" className="flex items-center text-gray-300 hover:text-white">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-900">
        <h2 className="text-xl font-semibold mb-6 text-white">
          My Purchases
        </h2>

        {/* FIX: Updated render logic */}
        {loading && (
          <p className="text-center text-gray-400">Loading purchases...</p>
        )}

        {errorMessage && (
          <div className="text-red-400 text-center mb-4">{errorMessage}</div>
        )}

        {!loading && !errorMessage && (
          <>
            {purchases.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {purchases.map((purchase, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 mb-6"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      {/* Course Image */}
                      <img
                        className="rounded-lg w-full h-48 object-cover"
                        src={
                          purchase.image?.url ||
                          "https://via.placeholder.com/200"
                        }
                        alt={purchase.title}
                      />
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-white">
                          {purchase.title}
                        </h3>
                        <p className="text-gray-400">
                          {purchase.description.length > 100
                            ? `${purchase.description.slice(0, 100)}...`
                            : purchase.description}
                        </p>
                        <span className="text-green-400 font-semibold text-sm">
                          ${purchase.price} only
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">You have no purchases yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Purchases;