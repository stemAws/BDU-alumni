import EachProfile from "./EachProfile"

const MultipleProfiles = ({profiles}) => {
  return (
    <>
    {
    profiles?.slice(-7)?.map((profile,index)=>
    <EachProfile 
    key={index}
    profile={profile}
     />
    )
    }
    </>
  )
}

export default MultipleProfiles