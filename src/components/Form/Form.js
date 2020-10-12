import React from 'react';
import './Form.scss';

const Form = () => {
  return (
    <form className='form'>
      <fieldset>
        <legend className='form__title'>Upload form</legend>
        <p>
          <label>Image URL</label>
          <input 
            className='form__input'
            type='text'
            placeholder='Enter image URL'
            required/>
        </p>
        <span>or</span>
        <p>
          <label>Choose file</label>
          <input 
            className='form__input'
            type='file'
            placeholder='file'
            required/>
        </p>
      </fieldset>
      <button className='form__button'>add</button>
      <button className='form__button' type='reset'>reset form</button>
    </form>
  );
};

export default Form;