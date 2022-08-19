import React, {useRef} from 'react';
import styled from 'styled-components';
import {useReactToPrint} from 'react-to-print';

export const Preview = ({gifts, setOpenModal, setPrevious}) => {
  const closePreview = () => {
    setOpenModal(false);
    setPrevious(false);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'lista-de-regalos-de-navidad',
    onAfterPrint: () => alert('🎅 Feliz Navidad 🎅'),
  });

  return (
    <>
      <PreviewContainer ref={componentRef}>
        <h1>Comprar:</h1>
        {gifts.map((gift) => (
          <GiftContainer key={gift.id}>
            <img src={gift.urlImg} alt="Imagen del regalo" />
            <p>
              {gift.entrygift}
              <br />
              <i>{gift.giftfor}</i>
            </p>
            <p id="pAcount">({gift.amount})</p>
          </GiftContainer>
        ))}
      </PreviewContainer>
      <ButtonContainer>
        <button onClick={handlePrint}>Imprimir</button>
        <button onClick={() => closePreview()}>Cerrar</button>
      </ButtonContainer>
    </>
  );
};

const PreviewContainer = styled.div`
  width: 100%;
  padding: 15px 15px 15px 15px;
  overflow-y: scroll;

  h1 {
    font-family: 'Mountains of Christmas', cursive;
    text-align: center;
    font-size: 50px;
    letter-spacing: 5px;
    margin-bottom: 10px;
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  p {
    text-align: center;
    padding: 5px;
    color: #757575;
    width: 50%;

    i {
      font-size: 12px;
    }
  }
`;

const GiftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 45px;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
  padding: 10px 20px;

  button {
    width: 100%;
    height: 40px;
    padding: 3px 0px;
    color: #fd392b;
    font-size: 18px;
    text-align: center;
    background-color: white;
    border: 1px solid #fd392b;
    border-radius: 5px;
    transition: all ease-in-out 0.1s;

    &:hover {
      cursor: pointer;
      color: white;
      background-color: #fd392b;
      border: 1px solid #fd392b;
    }
  }
`;
