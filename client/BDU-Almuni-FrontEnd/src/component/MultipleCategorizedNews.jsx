import CategorizedNews from "./CategorizedNews"

const MultipleCategorizedNews = ({multiplecataNews}) => {
  return (
    <>
        {
            [...multiplecataNews].reverse().map((news,index)=>{
            return(
            <CategorizedNews
            news={news}
            key={index}
            />
            )  
            })
        }
    </>
  )
}

export default MultipleCategorizedNews