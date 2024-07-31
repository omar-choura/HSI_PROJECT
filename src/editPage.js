import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import apiURL from './apiURL';

const EditPage = () => {
  const location = useLocation();
  const { site, image, description } = location.state || {};
  const { name } = useParams();

  const [reference, setReference] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedSite, setUpdatedSite] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    const fetchReference = async () => {
      try {
        const result = await axios.get(`${apiURL}/reference/getReference/${name}`);
        console.log('API Response:', result.data.data); // Debugging: Log API response
        setReference(result.data.data[0]); // Assuming result.data.data is an array
      } catch (err) {
        console.error('Error fetching reference:', err);
        alert('Server error');
      }
    };

    fetchReference();
  }, [name]);

  useEffect(() => {
    if (reference) {
      console.log('Reference data:', reference); // Debugging: Log reference state
      setUpdatedName(reference.name || '');
      setUpdatedSite(reference.site || '');
      setUpdatedDescription(reference.description || '');
      setPreviewImage(reference.image || ''); // Assuming reference.image holds the URL of the image
    }
  }, [reference]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", name);
      formData.append('name', updatedName);
      formData.append('site', updatedSite);
      formData.append('description', updatedDescription);
      if (updatedImage) {
        formData.append('image', updatedImage);
      } else {
        formData.append('image', image);
      }

      const response = await axios.put(`${apiURL}/reference/updateReference`, formData);
      console.log('Update Response:', response.data);
      alert('Reference updated successfully');
    } catch (err) {
      console.error('Error updating reference:', err.response ? err.response.data : err.message);
      alert('Server error');
    }
  };

  return (
    <div className="edit-page-container">
      <h1>Edit Reference</h1>
      {reference ? (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="name">
              Name:
              <input
                id="name"
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder={name}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="site">
              Site:
              <input
                id="site"
                type="text"
                value={updatedSite}
                onChange={(e) => setUpdatedSite(e.target.value)}
                placeholder={site}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="description">
              Description:
              <textarea
                id="description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                placeholder={description}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="image">
              Image:
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
              />
            </label>
            {previewImage && <img src={previewImage} alt="preview" style={{ marginTop: '10px', maxWidth: '100%' }} />}
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
