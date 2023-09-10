// console.log(import.meta.env);

import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // 回導覽 hook

const { VITE_APP_HOST } = import.meta.env;
const SignUp = () => {
  console.log(VITE_APP_HOST);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: ''
  })
  const navigate = useNavigate() // 把 hook 取出來做使用

  function HandleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  // 註冊 
  // 這段要用async或promise都可以
  async function 註冊() {
    // post 結構: 路徑, 資料, headers
    // get 結構: 路徑, headers
    const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, formData)
    console.log(res);
    navigate('/auth/login') // 當登入成功，轉址到登入頁
  }

  return (<>
    註冊
    <form action="">
      {JSON.stringify(formData)}
      <input type="email" placeholder="Email" name="email" onChange={HandleChange} /> <br />
      <input type="password" placeholder="Password" name="password" onChange={HandleChange} /> <br />
      <input type="text" placeholder="nickname" name="nickname" onChange={HandleChange} /> <br />
      <button type="button" onClick={(e) => {
        註冊()
      }}>註冊</button>
    </form>
  </>)
}

export default SignUp