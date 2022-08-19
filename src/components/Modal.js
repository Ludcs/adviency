import React from 'react';
import styled from 'styled-components';

export const Modal = ({children}) => {
  return (
    <>
      <Overlay>
        <ContainerModal>{children}</ContainerModal>
      </Overlay>
    </>
  );
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500px;
  max-height: 500px;

  width: 450px;
  padding-bottom: 10px;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  @media (max-width: 600px) {
    width: 70%;
    min-width: 350px;
    margin: auto;
    padding: 10px;
  }
`;
