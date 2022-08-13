import React from 'react';
import styled from 'styled-components';

export const Gifts = ({el, deleteGift, setDataToEdit, setOpenModal}) => {
  let {entrygift, price, giftfor, amount, urlImg, id} = el;

  const modalEdit = () => {
    setOpenModal(true);
    setDataToEdit({
      ...el,
      price: parseInt(price) / amount,
      amount: 1,
    });
  };

  const modalDuplicated = () => {
    setOpenModal(true);
    setDataToEdit({
      ...el,
      price: parseInt(price) / amount,
      amount: 1,
      id: null,
    });
  };

  return (
    <GifstContainer>
      <img src={urlImg} alt="Imagen del regalo" />
      <p>
        {entrygift}
        <br />
        <i>{giftfor}</i>
      </p>
      <p>
        ({amount}) - ${price}
      </p>
      <button onClick={() => modalDuplicated()}>D</button>
      <button onClick={() => modalEdit()}>E</button>
      <button onClick={() => deleteGift(id, entrygift, giftfor)}>X</button>
    </GifstContainer>
  );
};

const GifstContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: auto;
  text-align: left;
  margin-bottom: 5px;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  p {
    text-align: left;
    padding: 5px;
    color: #757575;
    width: 33%;
    margin-right: 10px;

    i {
      font-size: 12px;
    }
  }

  button {
    width: 25px;
    height: 25px;
    background-color: #fd392b;
    border: 1px solid #fd392b;
    color: white;
    border-radius: 5px;
    margin-right: 5px;
    &:hover {
      cursor: pointer;
    }
  }
`;
