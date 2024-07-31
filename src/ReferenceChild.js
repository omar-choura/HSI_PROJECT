import React from 'react';
import { Link } from 'react-router-dom';

const ReferenceChild = ({ data, onDelete }) => {
  const handleDelete = () => {
    onDelete(data.name);
  };

  const dataToPass = { site: data.site, image: data.image, description: data.description };

  return (
    <div className="ChildRef">
      <h1>{data.name} --- {data.site}</h1>
      <h2>{data.image}</h2>
      <p>{data.description}</p>
      <img src={`http://localhost:5555/photos/${data.image}`} alt={data.name} />
      <button onClick={handleDelete}>Supprimer</button>
      <Link 
        to={`/portal/edit/${data.name}`} 
        state={dataToPass}
      >Modifier</Link>
    </div>
  );
};

export default ReferenceChild;