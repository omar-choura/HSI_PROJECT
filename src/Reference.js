import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiURL from './apiURL';
import ReferenceChild from './ReferenceChild';

const Reference = () => {
  const [listReference, setListReference] = useState([]);
  const [name, setName] = useState('');
  const [site, setSite] = useState('');
  const [showForm, setShowForm] = useState(false);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addReferences();
  };

  return (
    <div>
      <h1>La liste des références</h1>

      {listReference.map((ele, index) => (
        <div key={index}>
          <ReferenceChild data={ele} />
          <hr />
        </div>
      ))}

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Click to Add Reference'}
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Site:
              <input
                type="text"
                value={site}
                onChange={(e) => setSite(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Reference;
