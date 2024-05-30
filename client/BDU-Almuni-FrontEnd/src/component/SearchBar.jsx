import { FaArrowDown, FaCaretDown, FaFilter, FaSearch, FaSlidersH} from 'react-icons/fa'
import "../styles/searchBar.css"
import {useNavigate}from 'react-router-dom'
import { useState } from 'react'
const SearchBar = ({setOutput}) => {
    const [input,setInput]=useState("");
    const navigate = useNavigate();
    const handleSearch=()=>{
        const searchContainers = document.querySelectorAll('.input_warper');
        searchContainers.forEach(searchContainer => {
          searchContainer.classList.toggle('active');
          const input = searchContainer.querySelector('.search_input');
          if (input) {
            input.focus();
          }
          const searchIcon = searchContainer.querySelector('.search_icon');
          if (searchIcon) {
            searchIcon.classList.toggle('active');
          }
        });
      };
      
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
    const handelEnter=async(event)=>{
      if (event.key === 'Enter') {
        navigate(`/search/${input}`);
      }
    }
  return (
    
    <div className="input_warper">
            <FaSearch onClick={handleSearch} className='search_icon' />
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