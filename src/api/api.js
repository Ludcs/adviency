export const api = {
  gifts: () =>
    new Promise((resolve, reject) => {
      try {
        const list = localStorage.getItem('regalos');
        setTimeout(() => {
          resolve({
            status: 'ok',
            data: list ? JSON.parse(list) : [],
          });
        }, 1000);
      } catch (error) {
        reject({
          status: 'error',
          data: [],
        });
      }
    }),

  save: (data) =>
    new Promise((resolve, reject) => {
      try {
        localStorage.setItem('regalos', JSON.stringify(data));
        resolve('Guardado');
      } catch (error) {
        reject('Error al guardar');
      }
    }),
};
