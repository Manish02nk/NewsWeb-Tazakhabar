"use client";
import { db } from "@/firebase/config";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

const Page = () => {
  const [formData, setformData] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    timestamp: serverTimestamp()
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handelFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await addDoc(collection(db, "newsPosts"), formData);
    setformData({
      title: "",
      shortDesc: "",
      fullDesc: "",
    })
    setLoading(false)
  }

  return (
    <form
      onSubmit={handelFormSubmit}
      className="text-gray-600 body-font relative max-w-5xl mx-auto"
    >
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="w-full bg-white flex flex-col md:ml-auto md:py-8 mt-8 md:mt-0">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Upload News Form
          </h2>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Title
            </label>
            <input
            value={formData.title}
              onChange={handleInputChange}
              type="text"
              name="title"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Short Desc
            </label>
            <input
            value={formData.shortDesc}
              onChange={handleInputChange}
              type="text"
              name="shortDesc"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Full Desc
            </label>
            <textarea
              onChange={handleInputChange}
              id="message"
              name="fullDesc"
            value={formData.fullDesc}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button disabled={loading} className="text-white disabled:cursor-not-allowed bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          {loading?"Loading..." : "Upload"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Page;
