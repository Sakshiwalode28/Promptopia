"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import UserProfile from "@components/UserProfile";

const UserProfileLink = ({ params }) => {
  const searchParams = useSearchParams();
  let userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);
  userName = `${userName}'s`
  return (
    <UserProfile
      name={userName}
      desc={`Welcome to ${userName} personalized profile page. Explore ${userName} exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfileLink;