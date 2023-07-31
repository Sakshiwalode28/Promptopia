
"use client"
import { useEffect, useState } from 'react';
import Loading from './profile/loading';
import Feed from "@components/Feed"


const Home = () => {

const[loading , setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
  }, [])
  return (
   <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
        Discover & Share 
        {/* <br className="max-md:hidden" /> */}
        <br />
        <span className="orange_gradient">AI-Powered Prompts</span>
    </h1>

    <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
    </p>
  {loading ?  <Feed/> : <Loading/> }
   
   </section>
  )
}

export default Home