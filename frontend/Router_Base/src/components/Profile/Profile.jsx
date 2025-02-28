const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
      <img
        // src={user.photoURL}
        alt="Profile"
        className="w-24 h-24 rounded-full"
      />
      {/* <h1 className="text-3xl mt-4">{user.name}</h1> */}
      {/* <p className="text-gray-400">{user.email}</p> */}
    </div>
  );
};

export default Profile;
