import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
  id: Date.now(),  
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const UpdateForm = props => {
  const [item, setItem] = useState(initialItem);

  const { match, items } = props;
  useEffect(() => {
    const id = match.params.id;
    console.log(id);
    console.log('This:',items);
    const itemToUpdate = items.find(item => {

        return `${item.id}` === id});
    if (itemToUpdate) {
      
      setItem(itemToUpdate);
    }
  }, [match, items]);

//   const changeHandler = ev => {
//     ev.persist();
//     let value = ev.target.value;
//     if (ev.target.name === 'metascore') {
//       value = parseInt(value, 10);
//     }

//     setItem({
//       ...item,
//       [ev.target.name]: value
//     });
//   };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, item)
      .then(res => {
        props.history.push(`/movies/${props.match.params.id}`);
        setItem(initialItem);
      })
      .catch(err => console.log(err.response));
  };

  console.log('Items:', items.stars)
  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={({target})=> setItem({...item, [target.name]: target.value})}
          placeholder="Title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={({target})=> setItem({...item, [target.name]: target.value})}
          placeholder="Metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={({target})=> setItem({...item, [target.name]: target.value})}
          placeholder="Director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={({target})=> setItem({...item, [target.name]: target.value})}
          placeholder="Stars"
          value={item.stars}
        />
        <div className="baseline" />

    
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
