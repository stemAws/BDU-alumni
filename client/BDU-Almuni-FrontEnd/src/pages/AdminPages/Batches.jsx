import Gallery from "../AdminPages/AGallery";

const Batches = ({ batchData, updateCategories }) => {
  return (
    <div>
      {batchData.map((batch) => (
        <Gallery
          key={batch.id}
          batch={batch}
          updateCategories={updateCategories}
   
        />
      ))}
    </div>
  );
};

export default Batches;
