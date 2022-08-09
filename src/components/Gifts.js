import React from 'react';
import styled from 'styled-components';

export const Gifts = ({entrygift, amount, id, deleteGift}) => {
  return (
    <GifstContainer>
      <p>{entrygift}</p>
      <p>Cantidad: {amount}</p>
      <button onClick={() => deleteGift(id)}>X</button>
    </GifstContainer>
  );
};

const GifstContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  margin: auto;
  text-align: left;

  p {
    text-align: left;
    padding: 5px;
    color: #757575;
    width: 33%;
    margin-right: 10px;
  }

  button {
    width: 25px;
    height: 25px;
    background-color: #fd392b;
    border: 1px solid #fd392b;
    color: white;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
`;
