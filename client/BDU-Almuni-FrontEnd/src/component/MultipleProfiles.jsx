import EachProfile from "./EachProfile"

const MultipleProfiles = ({profiles}) => {
  return (
    <>
    {
    profiles.slice(-7).map((profile,index)=>
    <>
    <EachProfile 
    profile={profile}
    key={index} />
    </>
    )
    }
    </>
  )
}

export default MultipleProfiles