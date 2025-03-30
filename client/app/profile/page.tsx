"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CommentCard from "@/components/CommentCard";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_USER } from "@/graphql/queries";
import useUser from "@/hooks/useUser";
import { Article } from "@/__generated__/graphql";
import ProfileLoading from "@/components/Profile/ProfileLoading";
import CutomError from "@/components/CustomError";

const ProfilePage: React.FC = () => {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const { user: loggedInUser } = useUser();

  useEffect(() => {
    const paramId = searchParams.get("id");
    if (paramId) setUserId(paramId);
  }, [searchParams]);

  const {
    data: userData,
    loading,
    error,
  } = useQuery(GET_SINGLE_USER, {
    variables: { userId: userId ?? "" },
    skip: !userId, // Prevent query from running if userId is null
  });

  if (!userId) return null; // Prevent rendering without a valid userId
  if (loading) return <ProfileLoading />;
  if (error) return <div className="text-center">Error: {error.message}</div>;

  const user = userData?.getUser;
  if (!user) return <CutomError error={`User with ID ${userId} not found`} />;

  const isLoggedInUser = loggedInUser?.id === user.id;

  return (
    <div className="min-h-screen flex flex-col items-center  p-6">
      <div className="w-full max-w-2xl  p-6 rounded-lg shadow-lg">
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            {isLoggedInUser ? "Your" : `${user.name}'s `} Profile
          </h1>
          <p className="text-lg">
            <span className="font-semibold">
              {isLoggedInUser ? "Your" : "User's"} Unique ID:
            </span>{" "}
            {user.id}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          {user.email && (
            <p className="text-lg">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          )}
          <div>
            <h2>{isLoggedInUser ? "Your" : "User's"} Past Comments</h2>
            {user.comments && user.comments.length > 0 ? (
              user.comments.map((c) => {
                if (!c) return null;

                return (
                  <CommentCard
                    key={c.id}
                    comment={c}
                    user={loggedInUser}
                    setData={() => {}} // Provide a placeholder function for setArticle
                    data={{} as Article} // Provide a placeholder for data
                  />
                );
              })
            ) : (
              <p className="mt-4 text-gray-400">
                {isLoggedInUser
                  ? "You have no comments"
                  : "User has no comments"}
              </p>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default ProfilePage;
