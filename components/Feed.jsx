"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";



const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [allPosts, setAllPosts] = useState([]);


  const fetchPosts = async () => {
    const res = await fetch("/api/prompt");
    const data = await res.json();
    setAllPosts(data);
  };

  useEffect(() => {
      console.log(allPosts);
      fetchPosts();
    }, []);


  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText , 'i');
    return allPosts.filter(item => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
)
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);


    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    )
  };

 


  const handleTagClick = ( tagName ) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


 
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer "
        />
      </form>
{searchText ? (
  // (e) => handleTagClick(e.target.value)
   <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
)  : (
  <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
)}
     
    </section>
  );
};

export default Feed;
