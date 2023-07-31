"use client";
import Loading from "@/app/profile/loading";
import PromptCard from "./PromptCard";
import { useState, useEffect } from "react";

const UserProfile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(true) , 1200)
    
  }, []);

  return (
    <section className="w-full">
      <h1 className="profile_usename_head_text text-left">
        <span className="blue_gradient">{name} Profile </span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {loading ? (
        data.length > 0 ? (
          <div className="mt-10 prompt_layout ">
            {data.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 pt-5 orange_gradient font-semibold no_post_text text-center">
            No posts yet.
          </div>
        )
      ) : (
        <>
        
        <br /><br />
        <Loading />
        </>
      )}
    </section>
  );
};

export default UserProfile;
