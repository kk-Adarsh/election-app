"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import pic1 from "../../signs/Picture1.jpg";
import pic2 from "../../signs/Picture2.jpg";
import pic3 from "../../signs/Picture3.jpg";
import pic4 from "../../signs/Picture4.png";
import pic5 from "../../signs/Picture5.jpg";
import pic6 from "../../signs/Picture6.jpg";

function ProfilePage() {
  const dataGirls = [
    { name: "Modi Khushbu", symbol: pic1, id: "girl1" },
    { name: "Pandey Krupa", symbol: pic2, id: "girl2" },
    { name: "Muskan Kumari", symbol: pic3, id: "girl3" },
  ];
  const dataBoys = [
    { name: "Saroj Shiva", symbol: pic4, id: "boy1" },
    { name: "Gaur Astitva", symbol: pic5, id: "boy2" },
    { name: "Jaiswal Dharamraj", symbol: pic6, id: "boy3" },
  ];

  const [selectedGirlId, setSelectedGirlId] = useState(null);
  const [selectedBoyId, setSelectedBoyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const onVote = async () => {
    try {
      if (!selectedBoyId || !selectedGirlId) {
        // toast.error("Please select one boy and one Girl");
        return;
      }
      setLoading(true);
      const response = await axios.post("/api/users/vote", {
        selectedBoyId,
        selectedGirlId,
      });
      // toast.success("Voted Successfully");
      setSelectedBoyId(null);
      setSelectedGirlId(null);
      setTimeout(() => setLoading(false), 5000);
    } catch (error: any) {
      // toast.error("Error while voting", error.message);
    }
  };
  return (
    <div className="mt-4">
      <div className="flex justify-evenly items-center">
        <h1 className="text-2xl">Head Girl</h1>
        {dataGirls.map((candidate: any) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
            className="relative flex flex-col text-gray-700 bg-white shadow-2xl bg-clip-border rounded-xl w-48"
            key={candidate.id}
            onClick={() => setSelectedGirlId(candidate.id)}
          >
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-28">
              <Image
                src={candidate.symbol}
                alt="profile-picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6 text-center">
              <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {candidate.name}
              </h4>
            </div>
            <div className="flex justify-center p-3 pt-0  gap-7">
              <button className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-4 focus:border-4 hover:border-indigo-800 hover:text-indigo-800 focus:border-purple-200 active:border-grey-900 active:text-grey-900 transition-all">
                {selectedGirlId === candidate.id ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-evenly mt-2 items-center">
        <h1 className="text-2xl">Head Boy</h1>

        {dataBoys.map((candidate: any) => (
          <div
            className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-48"
            key={candidate.id}
            onClick={() => setSelectedBoyId(candidate.id)}
          >
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white  bg-clip-border rounded-xl h-28">
              <Image
                src={candidate.symbol}
                alt="profile-picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6 text-center">
              <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {candidate.name}
              </h4>
            </div>
            <div className="flex justify-center p-3 pt-0  gap-7">
              <button className="px-5 py-3 rounded-xl text-sm font-medium text-indigo-600 bg-white outline-none focus:outline-none m-1 hover:m-0 focus:m-0 border border-indigo-600 hover:border-4 focus:border-4 hover:border-indigo-800 hover:text-indigo-800 focus:border-purple-200 active:border-grey-900 active:text-grey-900 transition-all">
                {selectedBoyId === candidate.id ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="select-none rounded-lg bg-red-500 w-40 py-3.5 px-7 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={onVote}
          disabled={loading}
        >
          {loading ? "Please Wait" : "Vote Now"}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
