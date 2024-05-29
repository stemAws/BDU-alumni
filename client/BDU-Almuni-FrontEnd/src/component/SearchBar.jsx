import { FaArrowDown, FaCaretDown, FaFilter, FaSearch, FaSlidersH} from 'react-icons/fa'
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
const [searchBy, setsearchBy] = useState()

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
          
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/alumni-directory/`,{
            credentials:'include',
            body: JSON.stringify({
              searchBy:searchBy,
              searchByValue:input
          }),
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
    <div className='search-with-filter'>
    <div className="input_warper">
            <FaSearch onClick={handleSearch} className='search_icon' />
    <input 
    className='search_input' 
    placeholder='Search' 
    type="text" 
    value={input}
    onChange={(e)=>handleChange(e.target.value)}
    /> 
        </div><div className='filter'>
        <div className='filter-control'>
          <FaSlidersH />
          <select 
          id="filter-types" 
          value={searchBy||''} 
          onChange={(e)=>setsearchBy(e.target.value)}>
            <option value="" disabled hidden>Filter</option>
            <option value="byName">Name</option>
            <option value="byGraduatingYear">Graduating Year</option>
            <option value="industry">Industry</option>
            <option value="department">Department</option>
            <option value="location">Location</option>
          </select>
        </div>

    </div>
    </div>
        

    
  )
}

export default SearchBar