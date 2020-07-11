import {postLogin} from './Api';

const addAS = async (data) => {
  var ret;
  const dt = await postLogin('api/login', data);
  console.log(dt);
  if (dt != null) {
    ret = dt;
  }
  return ret;
};

export {addAS};
