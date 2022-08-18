import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

export const Form = ({
  createGift,
  updateGift,
  dataToEdit,
  setDataToEdit,
  setOpenModal,
}) => {
  const [formValue, setFormValue] = useState({
    entrygift: '',
    price: '',
    giftfor: '',
    amount: '',
    urlImg: '',
    id: null,
  });
  const randomGift = [
    'Bicicleta',
    'Cafetera',
    'Mochila',
    'Ojotas',
    'Lentes',
    'Tatuaje',
    'Perfume',
    'Bonsai',
  ];

  useEffect(() => {
    if (dataToEdit) {
      setFormValue(dataToEdit);
    } else {
      setFormValue(formValue);
    }
  }, [dataToEdit]);

  const handleInputChange = (e) => {
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

    if (formValue.id === null) {
      createGift(formValue);
    } else {
      updateGift(formValue);
    }

    handleReset();
    setOpenModal(false);
    setDataToEdit(null);
  };

  const handleReset = () => {
    setFormValue({
      entrygift: '',
      price: 0,
      giftfor: '',
      amount: 0,
      urlImg: '',
      id: null,
    });
  };

  const getRandomGift = () => {
    let random = Math.floor(Math.random() * randomGift.length);

    setFormValue({
      ...formValue,
      entrygift: randomGift[random],
    });
  };

  return (
    <FormContainer>
      <Div>
        <button id="surprise" onClick={() => getRandomGift()}>
          Sorpréndeme 🎁
        </button>
      </Div>
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
          placeholder="Precio..."
          className="no-spinner"
          name="price"
          value={formValue.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Es para..."
          name="giftfor"
          value={formValue.giftfor}
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
          placeholder="Cantidad"
          name="amount"
          value={formValue.amount}
          onChange={handleInputChange}
          // min="0"
          // max="10"
        />
        <ContainerButtons>
          <button id="closebtn" onClick={() => setOpenModal(false)}>
            Cerrar
          </button>
          <button>{formValue.id === null ? 'Agregar' : 'Guardar'}</button>
        </ContainerButtons>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 380px;
  padding: 20px;
  margin: auto;

  @media (max-width: 600px) {
    width: 70%;
    min-width: 350px;
    margin: auto;
  }

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

  input[type='number'].no-spinner::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'].no-spinner {
    -moz-appearance: textfield;
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

const Div = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  height: 36px;
  margin-bottom: 20px;

  #surprise {
    background-color: white;
    color: #fd392b;
    border: 1px solid #fd392b;
    border-radius: 5px;
    width: fit-content;
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

const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
