
// import  instance from '../api';
import instance from '../api';


export const activate = async (datas:{uid:string,token:string}) => {
  const value = datas.code.value; // this is a string

  const parsed = JSON.parse(value); // convert it to an object

  const response = await instance.post('auth/users/activation/',{
    uid: parsed.uid ,
    token: parsed.token
  }).then((data)=>{
    return data;
  });
  console.log(response)
  return response;
};
