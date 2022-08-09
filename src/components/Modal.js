import React from 'react';

export const Modal = ({setOpenModal}) => {
  return (
    <div>
      <p>Modal</p>
      <button onClick={() => setOpenModal(false)}>Agregar</button>
    </div>
  );
};
