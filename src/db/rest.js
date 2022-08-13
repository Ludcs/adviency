gifts.some((gift) =>
  gift.entrygift === data.entrygift && gift.giftfor === data.giftfor
    ? alert('Este regalo ya esta en la lista para esa persona')
    : setGifts([...gifts, data])
);
