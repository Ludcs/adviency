import styled, {createGlobalStyle} from 'styled-components';
import bgimage from './assets/img/bg-navidad.jpg';
import {Form} from './components/Form';
import {useState, useEffect} from 'react';
// import {dbGifts} from './db/dbGifts';
import {Gifts} from './components/Gifts';

export const App = () => {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem('regalos');
    if (data) {
      setGifts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('regalos', JSON.stringify(gifts));
  }, [gifts]);

  const createGift = (data, llave) => {
    data.id = llave;

    gifts.some((gift) => gift.entrygift === data.entrygift)
      ? alert('El regalo ya esta en la lista')
      : setGifts([...gifts, data]);
  };

  const updateGift = (data) => {};

  const deleteGift = (id) => {
    // let filteredGifts = gifts.filter((gift) => (gift.id === id ? false : true)); //FORMA LARGA.
    let filteredGifts = gifts.filter((gift) => gift.id !== id); //quedate con los gift cuyo id no sea igual al id que te pase por parametro!
    setGifts(filteredGifts);
  };

  return (
    <>
      <GlobalStyles />
      <BgContainer>
        <MainContainer>
          <h1>Regalos:</h1>
          <Form
            gifts={gifts}
            setGifts={setGifts}
            createGift={createGift}
            updateGift={updateGift}
          />
          {gifts.length === 0 ? (
            <p>No hay regalos, agrega uno 🙏</p>
          ) : (
            gifts.map((gift) => (
              <Gifts
                key={gift.id}
                id={gift.id}
                entrygift={gift.entrygift}
                amount={gift.amount}
                deleteGift={deleteGift}
              />
            ))
          )}
          {gifts.length === 0 ? null : (
            <ButtonDelAll onClick={() => setGifts([])}>
              Borrar todo
            </ButtonDelAll>
          )}
        </MainContainer>
      </BgContainer>
    </>
  );
};

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }    
`;

const BgContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bgimage});
  background-repeat: no-repeat;
  background-position: 100%;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    background-position: right;
    background-size: cover;
    max-height: 100%;
  }
`;

const MainContainer = styled.div`
  background-color: white;
  width: 400px;
  height: 500px;
  border-radius: 10px;
  padding: 10px 20px;

  h1 {
    font-family: 'Mountains of Christmas', cursive;
    text-align: center;
    font-size: 50px;
    letter-spacing: 5px;
  }

  p {
    text-align: left;
    color: #757575;
    font-size: 18px;
    padding: 5px;
  }
`;

const ButtonDelAll = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  padding: 3px 0px;
  color: #fd392b;
  font-size: 18px;
  text-align: center;
  background-color: white;
  border: 1px solid #fd392b;
  transition: all ease-in-out 0.1s;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #fd392b;
    border: 1px solid #fd392b;
  }
`;
