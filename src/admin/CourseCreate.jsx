import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function CourseCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      toast.error("You are not logged in.");
      navigate("/admin/login");
      return;
    }

    const admin = JSON.parse(adminData);
    const token = admin.token;
    if (!token) {
      toast.error("Authentication token not found. Please log in again.");
      navigate("/admin/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/course/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success(response.data.message || "Course created successfully");
      navigate("/admin/our-courses");
      setTitle("");
      setPrice("");
      setImage("");
      setDescription("");
      setImagePreview("");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data?.message ||
        "An unknown error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-8 text-white">Create Course</h3>
        <form onSubmit={handleCreateCourse} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg text-gray-300">Title</label>
            <input
              type="text"
              placeholder="Enter your course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg text-gray-300">Description</label>
            <input
              type="text"
              placeholder="Enter your course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg text-gray-300">Price</label>
            <input
              type="number"
              placeholder="Enter your course price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-lg text-gray-300">Course Image</label>
            <div className="flex items-center justify-center">
              <img
                src={imagePreview ? `${imagePreview}` : "/imgPL.webp"}
                alt="Image"
                className="w-full max-w-sm h-auto rounded-md object-cover"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourseCreate;