import styled, {createGlobalStyle} from 'styled-components';
import bgimage from './assets/img/bg-navidad.jpg';
import {Form} from './components/Form';
import {useState, useEffect} from 'react';
import {Gifts} from './components/Gifts';
import {Modal} from './components/Modal';
import {Preview} from './components/Preview';
import {api} from './api/api';
import On from './assets/icons/musicOn.svg';
import Off from './assets/icons/musicOff.svg';
import {ParticleBackground} from './components/ParticleBackground';
import {Howl, Howler} from 'howler';
import FnAudio from './audio/feliz-navidad.mp3';
import {useRef} from 'react';

export const App = () => {
  const [gifts, setGifts] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previous, setPrevious] = useState(false);
  const [audio, setAudio] = useState(false);

  useEffect(() => {
    api
      .gifts()
      .then((gifts) => setGifts(gifts.data))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    api.save(gifts);
  }, [gifts]);

  const sound = useRef(
    new Howl({
      src: [FnAudio],
      HTML5: true,
      loop: true,
      preload: true,
    })
  );

  const handleSound = () => {
    Howler.volume(0.3);
    if (audio === false) {
      setAudio(true);
      sound.current.play();
    }
    if (audio === true) {
      setAudio(false);
      sound.current.pause();
    }
  };

  const createGift = (data) => {
    data.id = Math.random();
    data.price = parseInt(data.price) * data.amount;

    gifts.some(
      (gift) =>
        gift.entrygift === data.entrygift && gift.giftfor === data.giftfor
    )
      ? alert('Este regalo ya esta en la lista para esa persona')
      : setGifts([...gifts, data]);
  };

  const updateGift = (el) => {
    el.price = parseInt(el.price) * el.amount;
    let newData = gifts.map((gift) => (gift.id === el.id ? el : gift));
    setGifts(newData);
  };

  const deleteGift = (id, entrygift, giftfor) => {
    let isDeleteGift = window.confirm(
      `¿Estas seguro de eliminar ${entrygift} para ${giftfor} de la lista?`
    );

    if (isDeleteGift) {
      let filteredGifts = gifts.filter((gift) => gift.id !== id);
      setGifts(filteredGifts);
    }
  };

  const deleteAll = () => {
    let isDelete = window.confirm(
      '¿Estas seguro de eliminar todos los regalos?'
    );

    if (isDelete) {
      setGifts([]);
    }
  };

  let total = gifts.reduce((acc, gift) => {
    return acc + gift.price;
  }, 0);

  const modalPreview = () => {
    setOpenModal(true);
    setPrevious(true);
  };

  return (
    <>
      <GlobalStyles />
      <ParticleBackground />
      <BgContainer>
        <MainContainer>
          {isLoading ? (
            <p
              style={{
                textAlign: 'left',
                fontSize: '40px',
                paddingTop: '10px',
              }}
            >
              Cargando...
            </p>
          ) : (
            <>
              <TitleIconsContainer>
                <h1>Regalos:</h1>
                {audio ? (
                  <>
                    <img
                      src={On}
                      onClick={() => handleSound()}
                      alt="Audio On"
                      title="Stop audio"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={Off}
                      onClick={() => handleSound()}
                      alt="Audio Off"
                      title="Play audio"
                    />
                  </>
                )}
              </TitleIconsContainer>
              <ButtonAdd onClick={() => setOpenModal(true)}>
                Agregar regalo
              </ButtonAdd>
              {openModal && (
                <Modal>
                  {previous ? (
                    <Preview
                      gifts={gifts}
                      setOpenModal={setOpenModal}
                      setPrevious={setPrevious}
                    />
                  ) : (
                    <Form
                      createGift={createGift}
                      updateGift={updateGift}
                      dataToEdit={dataToEdit}
                      setDataToEdit={setDataToEdit}
                      setOpenModal={setOpenModal}
                    />
                  )}
                </Modal>
              )}
              <DIIIV>
                {gifts.length === 0 ? (
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: '20px',
                    }}
                  >
                    🙏 No hay regalos, agrega uno 🙏
                  </p>
                ) : (
                  gifts.map((gift) => (
                    <Gifts
                      key={gift.id}
                      el={gift}
                      updateGift={updateGift}
                      deleteGift={deleteGift}
                      setDataToEdit={setDataToEdit}
                      setOpenModal={setOpenModal}
                    />
                  ))
                )}
              </DIIIV>
              <hr
                style={{
                  marginTop: '15px',
                }}
              />
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '20px',
                  marginTop: '5px',
                }}
              >
                Total: ${total}
              </p>
              {gifts.length === 0 ? null : (
                <>
                  <ButtonDelAll onClick={() => deleteAll()}>
                    Borrar todo
                  </ButtonDelAll>
                  <ButtonPreview onClick={() => modalPreview()}>
                    Previsualizar
                  </ButtonPreview>
                </>
              )}
            </>
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
  min-height: 500px;
  max-height: 500px;
  border-radius: 10px;
  padding: 10px 20px;
  z-index: 100;

  @media (max-width: 600px) {
    width: 70%;
    min-width: 350px;
    margin: auto;
  }
  @media (min-width: 600px) {
    width: 450px;
  }

  p {
    text-align: left;
    color: #757575;
    font-size: 16px;

    @media (max-width: 545px) {
      font-size: 12px;
    }
  }
`;

const TitleIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;

  h1 {
    font-family: 'Mountains of Christmas', cursive;
    text-align: center;
    font-size: 50px;
    letter-spacing: 5px;
  }

  img {
    cursor: pointer;
  }
`;

const ButtonAdd = styled.button`
  width: 100%;
  height: 40px;
  background-color: #fd392b;
  border-radius: 5px;
  border: none;
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 3px 0px;
  font-size: 18px;
  cursor: pointer;
`;

const ButtonDelAll = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 20px;
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
`;

const ButtonPreview = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 20px;
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
`;

const DIIIV = styled.div`
  margin: auto;
  width: 100%;
  height: 160px;
  overflow-y: scroll;
`;
