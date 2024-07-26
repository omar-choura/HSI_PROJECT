import React from 'react';

const ReferenceChild = ({ data, onDelete }) => {
  const handleDelete = () => {
    onDelete(data.name);
  };

  return (
    <div className="ChildRef">
      <h1>{data.name} --- {data.site}</h1>
      <h2>{data.image}</h2>
      <img src={`http://localhost:5555/photos/${data.image}`} alt={data.name} />
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
};

export default ReferenceChild;