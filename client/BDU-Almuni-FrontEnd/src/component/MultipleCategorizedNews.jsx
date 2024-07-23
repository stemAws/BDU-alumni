import CategorizedNews from "./CategorizedNews"

const MultipleCategorizedNews = ({newsClicked,navValue,multiplecataNews}) => {
  let today,formattedToday,yesterday,formattedYesterday,lastWeek,formattedLastweek;
   today = new Date();
   formattedToday = today.toISOString().split('T')[0];
   yesterday = new Date();
   yesterday.setDate(today.getDate() - 1);
   formattedYesterday = yesterday.toISOString().split('T')[0];
   lastWeek =new Date();
   lastWeek.setDate(today.getDate() - 7);
   formattedLastweek = lastWeek.toISOString().split('T')[0];
  return (
    <>
        {navValue==="latest"?
            [...multiplecataNews].reverse().map((news,index)=>{
            return(
            <CategorizedNews
            news={news}
            key={index}
            newsClicked={newsClicked}
            />
            )  
            })
            : (navValue==="yesterday")?(
              [...multiplecataNews].reverse().map((news,index) => { 
                if (news.createdAt===formattedYesterday) {
                  return(
                  <CategorizedNews
                    news={news}
                    key={index}
                    newsClicked={newsClicked}
                />)
                
                }
              })
          ):(navValue==="lastWeek")?(
            [...multiplecataNews].reverse().map((news,index) => { 
              if (news.createdAt>=formattedLastweek && news.createdAt < formattedToday ) {
                return(
                <CategorizedNews
                  news={news}
                  key={index}
                  newsClicked={newsClicked}
              />)
}})
        ):""
        }
    </>
  )
}

export default MultipleCategorizedNews

// [...multiplecataNews].filter((yesterdayNews)=>{

//   const yesterdaysNews =yesterdayNews.createdAt.toISOString().split('T')[0] === yesterday;
//   return(
//     <CategorizedNews
//     news={yesterdaysNews}
//     key={index}
//     />
//   )
// }