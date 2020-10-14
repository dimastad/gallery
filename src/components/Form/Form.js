import React from 'react';
import './Form.scss';

const Form = ({addData, value, handleOnChange}) => {

  return (
    <form className='form' onSubmit={addData}>
    <input
      className='form__input'
      type='url'
      placeholder='Enter image URL'
      value={value}
      onChange={handleOnChange}
      required/>
      <button className='form__button'>Загрузить</button>
    </form>
  );
};

export default Form;