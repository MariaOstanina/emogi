import { useState } from 'react';
import styled from 'styled-components';

export const FormRadio = () => {
  const [value, setValue] = useState('16');

  const changedHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <form>
      <h2>Выберите количество ячеек:</h2>
      <input
        type='radio'
        id='radio16'
        name='cell'
        value='16'
        checked={value === '16'}
        onChange={changedHandler}
      ></input>
      <label htmlFor='radio16'>16</label>
      <input
        type='radio'
        id='radio25'
        name='cell'
        value='25'
        checked={value === '25'}
        onChange={changedHandler}
      ></input>
      <label htmlFor='radio25'>25</label>
      <input
        type='radio'
        id='radio36'
        name='cell'
        value='36'
        checked={value === '36'}
        onChange={changedHandler}
      ></input>
      <label htmlFor='radio36'>36</label>
    </form>
  );
};
