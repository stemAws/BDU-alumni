import { Link } from 'react-router-dom';
const passProfile= ()=>{

}
const SearchList = ({ result }) => {
  return (
    <div className="search_result">
      <a  href={`/ProfilePage/${result.username}`}>{result.name}</a>
    </div>
  );
};

export default SearchList;
