import React from "react";

function UserProfile({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-xl">Profile</h1>
      <hr />
      <p className="text-4xl">{params.id}</p>
    </div>
  );
}

export default UserProfile;
