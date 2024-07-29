import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiURL from './apiURL';
import ReferenceChild from './ReferenceChild';
import { Link } from 'react-router-dom';
import './index.css';

const Reference = () => {
  const [listReference, setListReference] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [site, setSite] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getReferences = async () => {
    try {
      const result = await axios.get(`${apiURL}/reference/getAllReferences`);
      setListReference(result.data.data);
    } catch (err) {
      console.log('Error getting references:', err);
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addReferences = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("site", site);
      formData.append("image", file);
      await axios.post(`${apiURL}/reference/addNewReferenceWithImage`, formData);
      setName('');
      setSite('');
      setFile(null);
      getReferences();
      setShowForm(false);
    } catch (err) {
      console.log('Error adding reference:', err);
      alert('Server error adding ref');
    }
  };

  const deleteReference = async (name) => {
    try {
      await axios.delete(`${apiURL}/reference/deleteReference/${name}`);
      getReferences();
    } catch (err) {
      console.log('Error deleting reference:', err);
      alert('Server error');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addReferences();
  };

  useEffect(() => {
    getReferences();
  }, []);

  return (
    <div className="reference-container">
      <h1>La liste des références</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {listReference.map((ele, index) => (
            <div key={index}>
              <ReferenceChild data={ele} onDelete={deleteReference} />
              <hr />
            </div>
          ))}
        </>
      )}

      <button className="toggle-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Click to Add Reference'}
      </button>

      {showForm && (
        <form className="reference-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>
              Nom:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Site:
              <input
                type="text"
                value={site}
                onChange={(e) => setSite(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Image:
              <input
                type="file"
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Reference;
