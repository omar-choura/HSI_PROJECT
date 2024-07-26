// src/editPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiURL from './apiURL';

const EditPage = () => {
  const { name } = useParams();
  const [reference, setReference] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedSite, setUpdatedSite] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

  useEffect(() => {
    const fetchReference = async () => {
      try {
        const result = await axios.get(`${apiURL}/reference/getReference/${name}`);
        setReference(result.data.data);
        setUpdatedName(result.data.data.name);
        setUpdatedSite(result.data.data.site);
      } catch (err) {
        console.log('Error fetching reference:', err);
        alert('Server error');
      }
    };

    fetchReference();
  }, [name]);

  const handleImageChange = (e) => {
    setUpdatedImage(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", updatedName);
      formData.append("site", updatedSite);
      if (updatedImage) {
        formData.append("image", updatedImage);
      }

      await axios.put(`${apiURL}/reference/updateReference`, formData);
      alert('Reference updated successfully');
    } catch (err) {
      console.log('Error updating reference:', err);
      alert('Server error');
    }
  };

  return (
    <div className="edit-page-container">
      <h1>Edit Reference</h1>
      {reference ? (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>
              Name:
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Site:
              <input
                type="text"
                value={updatedSite}
                onChange={(e) => setUpdatedSite(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Image:
              <input
                type="file"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditPage;
