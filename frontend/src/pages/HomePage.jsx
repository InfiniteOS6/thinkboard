import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import Note from '../components/Note';
import NotesNotFound from '../components/NotesNotFound';
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [Notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("error fetching notes");
        console.log(error.response);
        if(error.response?.status === 429){
          setIsRateLimited(true);
        }else{
          toast.error("failed to load notes");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  },[]);
  return (
    <div className='min-h-screen'>
        <Navbar />
        {isRateLimited && <RateLimitedUI />}
         <div className="max-w-7xl mx-auto p-4 mt-6">
          {isLoading && <div className="text-center text-primary py-10">Loading notes...</div>} 
          {Notes.length === 0 && !isRateLimited && <NotesNotFound />}
          {Notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {Notes.map((note) => (
                 <Note key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}
         </div>


    </div>
  )
}

export default HomePage