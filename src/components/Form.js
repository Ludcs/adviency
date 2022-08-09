import React, {useState} from 'react';
import styled from 'styled-components';
import {dbGifts} from '../db/dbGifts';

export const Form = ({gifts, setGifts, createGift, updateGift}) => {
  const [llave, setLlave] = useState(dbGifts.length + 1);
  const [formValue, setFormValue] = useState({
    entrygift: '',
    amount: 1,
    id: llave,
  });

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValue.entrygift === '') {
      alert('No agregaste ningun regalo Grinch 😒');
      return;
    }
    createGift(formValue, llave); //este formValue es lo que le llega como (data) a la fn que vive en App.js!
    handleReset();
  };

  const handleReset = () => {
    setFormValue({
      entrygift: '',
      id: llave + 1,
    });
    setLlave(llave + 1);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Agrega un regalo..."
          name="entrygift"
          value={formValue.entrygift}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="amount"
          value={formValue.amount}
          onChange={handleInputChange}
          min="1"
          max="10"
        />
        <button type="submit">Agregar</button>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
  margin: 10px 0px;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;

    flex-direction: row;
    gap: 20px;
  }

  input {
    border-radius: 5px;
    border: 1px solid lightgray;
    width: 300px;
    height: 30px;
    padding: 5px;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  button {
    background-color: white;
    color: #fd392b;
    border: 1px solid #fd392b;
    border-radius: 5px;
    width: fit-content;
    height: 30px;
    padding: 5px;
    font-size: 16px;
    transition: all ease-in-out 0.1s;

    &:hover {
      cursor: pointer;
      background-color: #fd392b;
      color: white;
      border: 1px solid #fd392b;
    }
  }
`;
