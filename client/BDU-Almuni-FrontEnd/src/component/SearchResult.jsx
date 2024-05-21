import SearchList from "./SearchList"

const SearchResult = ({outPut}) => {
  if (!Array.isArray(outPut) || outPut === undefined) {
    return null;
  }
    
  
  return (
    <div className="results_lists">
        {outPut.map((result,id)=>{
            return <SearchList key={id} result={result}/>
             })}
    </div>
  )
}

export default SearchResult