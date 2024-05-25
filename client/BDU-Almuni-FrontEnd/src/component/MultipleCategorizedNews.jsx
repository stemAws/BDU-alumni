import CategorizedNews from "./CategorizedNews"

const MultipleCategorizedNews = ({multiplecataNews}) => {
    console.log(multiplecataNews,"multi news")
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