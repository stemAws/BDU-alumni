import EachJob from "./EachJob";

const JobOffers = ({jobOffers,setopenJODetail,onReadMore}) => {
  return (
    <>
      {jobOffers.slice(-4).reverse().map((jobOffer, index) => {
        
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