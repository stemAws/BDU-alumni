import { FaSearch} from 'react-icons/fa'
import "../styles/searchBar.css"
import { useState } from 'react'
const SearchBar = ({setOutput}) => {
    const [input,setInput]=useState("");
    
    // const fetchData = (value) => {
    //     fetch('${process.env.REACT_APP_BACKEND_URL}/alumni/')
    //         .then((response) => response.json())
    //         .then((json) => {
    //             const alumniArray = json[0];
    //             console.log(alumniArray)
    
    //             const results = alumniArray.filter((user) => {
    //                 return value && user && user.fullName && user.fullName.toLowerCase().includes(value);
    //             });
    
    //             setOutput(results);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // };


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
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/alumni/`,{
            credentials:'include',
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
  return (
        <div className="input_warper">
            <FaSearch onClick={handleSearch} className='search_icon' />
    <input 
    className='search_input' 
    placeholder='Search' 
    type="text" 
    value={input}
    onChange={(e)=>handleChange(e.target.value)}
    />
        </div>

    
  )
}

export default SearchBar