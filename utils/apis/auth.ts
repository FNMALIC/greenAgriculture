
// import  instance from '../api';
import instance from '../api';


export const activate = async (datas: { code: { uid: string, token: string } }) => {
  const response = await instance.post('auth/users/activation/', {
    uid: datas.code.uid,
    token: datas.code.token
  });
  console.log(response);
  return response;
};
