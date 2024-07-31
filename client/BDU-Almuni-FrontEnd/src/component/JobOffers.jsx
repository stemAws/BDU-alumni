import EachJob from "./EachJob";

const JobOffers = ({jobsToShow,jobOffers,setopenJODetail,onReadMore}) => {
  return (
    <>
      {jobOffers.slice(-jobsToShow).reverse().map((jobOffer, index) => {
        
          return (
            <EachJob
              key={index}
              jobOffer={jobOffer}
              setopenJODetail={setopenJODetail}
              onReadMore={onReadMore}
            />
          );
      })}
    </>
  )
}

export default JobOffers