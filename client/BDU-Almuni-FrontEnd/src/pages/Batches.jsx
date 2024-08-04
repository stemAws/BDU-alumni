import Gallery from "./Gallery";

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
