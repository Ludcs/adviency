import React, {useState} from 'react';
import styled from 'styled-components';

export const Form = ({createGift, updateGift}) => {
  const [formValue, setFormValue] = useState({
    entrygift: '',
    amount: 0,
    urlImg: '',
    id: null,
  });

  const handleInputChange = (e) => {
    //console.log(e.target.value);
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
    createGift(formValue); //este formValue es lo que le llega como (data) a la fn que vive en App.js!
    handleReset();
  };

  const handleReset = () => {
    setFormValue({
      entrygift: '',
      amount: 0,
      urlImg: '',
      id: null,
    });
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
          type="url"
          placeholder="http://giftimage..."
          name="urlImg"
          value={formValue.urlImg}
          onChange={handleInputChange}
        />
        <input
          id="inputnumber"
          type="number"
          name="amount"
          value={formValue.amount}
          onChange={handleInputChange}
          min="0"
          max="10"
        />
        <button type="submit">Agregar</button>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  margin: 10px 0px;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    gap: 10px;
  }

  input {
    border-radius: 5px;
    border: 1px solid lightgray;
    width: 100px;
    height: 35px;
    padding: 5px;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  #inputnumber {
    width: 40px;
    text-align: center;
  }

  button {
    background-color: white;
    color: #fd392b;
    border: 1px solid #fd392b;
    border-radius: 5px;
    height: 35px;
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
