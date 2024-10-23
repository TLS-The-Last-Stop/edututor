import { useState } from 'react';


const info = {
  fullName: '',
  loginId : '',
  password: '',
  email   : '',
  phoneNum: '',
  birthDay: ''
  
};

const UserJoin = () => {
  const [loginInfo, setLoginInfo] = useState();
  return (
    <>
      <h2>일반 회원가입</h2>
    </>
  );
};

export default UserJoin;