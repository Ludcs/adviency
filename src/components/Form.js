import React, {useState} from 'react';
import styled from 'styled-components';

export const Form = ({createGift, updateGift, setOpenModal}) => {
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
    setOpenModal(false);
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
        <ContainerButtons>
          <button id="closebtn" onClick={() => setOpenModal(false)}>
            Cerrar
          </button>
          <button type="submit">Agregar</button>
        </ContainerButtons>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 380px;
  height: 330px;
  padding: 20px;
  margin: auto;

  form {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  input {
    border-radius: 5px;
    border: 1px solid lightgray;
    width: 100%;
    height: 35px;
    padding: 5px;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  #inputnumber {
    width: 100%;
    padding: 5px;
  }

  #closebtn {
    background-color: white;
    color: #757575;
    border: 1px solid #757575;
    border-radius: 5px;
    height: 35px;
    width: 70px;
    padding: 5px;
    font-size: 16px;
  }

  button {
    background-color: white;
    color: #fd392b;
    border: 1px solid #fd392b;
    border-radius: 5px;
    height: 35px;
    width: 70px;
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

const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
