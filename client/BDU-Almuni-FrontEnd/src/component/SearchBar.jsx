import { FaArrowDown, FaCaretDown, FaFilter, FaSearch, FaSlidersH} from 'react-icons/fa'
import "../styles/searchBar.css"
import {useNavigate}from 'react-router-dom'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
const SearchBar = ({setOutput}) => {
    const [input,setInput]=useState("");
    const navigate = useNavigate();
    // const handleSearch=()=>{
    //     const searchContainers = document.querySelectorAll('.input_warper');
    //     searchContainers.forEach(searchContainer => {
    //       searchContainer.classList.toggle('active');
    //       const input = searchContainer.querySelector('.search_input');
    //       if (input) {
    //         input.focus();
    //       }
    //       const searchIcon = searchContainer.querySelector('.search_icon');
    //       if (searchIcon) {
    //         searchIcon.classList.toggle('active');
    //       }
    //     });
    //   };
      
    const fetchData = async (value) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/alumni`,{
            credentials:'include'
          });

            if (response.ok) {
            const json = await response.json();
            const results = json.filter((user) => {
              
            return value && user && user.name && user.name.toLowerCase().includes(value);
            });
            setOutput(results);
            }  
        } catch (error) {
            console.error('Error during fetching alumni data:', error);
        }
        };
      
    
    
    const handleChange=(value)=>{
        setInput(value);
        fetchData(value);
    }
    const handelEnter=(event)=>{
      if (event.key === 'Enter'|| event.type=== 'click') {
        if (input) {
          navigate(`/search/${input}`); 
          document.querySelector(".results_lists").style.display="none" 
        }
        else{
          toast.error('Please enter a name to search')
        }
      }
     
    }
  return (
    <div className="input_warper">
      <ToastContainer/>
            <FaSearch onClick={handelEnter} className='search_icon' />
    <input 
    className='search_input' 
    placeholder='Search' 
    type="text" 
    value={input}
    onChange={(e)=>handleChange(e.target.value)}
    onKeyDown={handelEnter}
    /> 
        </div>
        

    
  )
}

export default SearchBar