import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiURL from './apiURL';
import ReferenceChild from './ReferenceChild';
import './index.css'; // Ensure this import is correct

const Reference = () => {
  const [listReference, setListReference] = useState([]);
  const [name, setName] = useState('');
  const [site, setSite] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSite, setNewSite] = useState('');
  const [image,setImage]=useState("")
  const getReferences = async () => {
    try {
      const result = await axios.get(`${apiURL}/reference/getAllReferences`);
      setListReference(result.data.data);
    } catch (err) {
      console.log('Error getting references:', err);
      alert('Server error');
    }
  };

  useEffect(() => {
    getReferences();
  }, []);

  const addReferences = async () => {
    try {
      await axios.post(`${apiURL}/reference/addNewreference`, { name, site });
      setName('');
      setSite('');
      getReferences(); // Refresh the list of references after adding a new one
      setShowForm(false); // Hide the form after submission
    } catch (err) {
      console.log('Error adding reference:', err);
      alert('Server error');
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

  const handleUpdate = async () => {
    try {
      const updatedReference = {
        name,
        newName,
        newSite,
      };
      await axios.put(`${apiURL}/reference/updateReference`, updatedReference);
      getReferences();
    } catch (err) {
      console.log('Error updating reference:', err);
      alert('Server error');
    }
  };

  return (
    <div className="reference-container">
      <h1>La liste des références</h1>

      {listReference.map((ele, index) => (
        <div key={index}>
          <ReferenceChild data={ele} onDelete={deleteReference} />
          <hr />
        </div>
      ))}

      <button className="toggle-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Click to Add Reference'}
      </button>

      {showForm && (
        <form className="reference-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>
              Name:
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
              Image :
              <input
                type="file"
                value={image}
                //onChange={(e) => setSite(e.target.files)}
                onChange={handleImage}
              />
            </label>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}

      {/* <div>
            <h2>Update Reference</h2>
            <input
              type="text"
              placeholder="Current Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="New Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="text"
              placeholder="New Site"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
          </div> */}
          </div>
  );
};

export default Reference;
