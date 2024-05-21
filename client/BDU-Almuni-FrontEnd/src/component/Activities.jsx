import Activity from './Activity';

const Activities = ({ imageUrl,personalInfo,activities, onEdit }) => {
  return (
    <div className='activity_grid_conatiner'>
      {activities.slice(-4).reverse().map((activity, index) => {
        
          return (
            <Activity
              key={index}
              activity={activity}
              onEdit={onEdit}
              personalInfo={personalInfo}
              imageUrl={imageUrl}
            />
          );
        return null;
      })}
    </div>
  );
};

export default Activities;
