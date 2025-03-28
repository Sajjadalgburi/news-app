import React from "react";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";

const UserLoggedIn = () => {
  return (
    <>
      <ProfileButton />
      <LogoutButton />
    </>
  );
};

export default UserLoggedIn;
