import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // 回導覽 hook

const { VITE_APP_HOST } = import.meta.env;

function Login () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate() // 把 hook 取出來做使用
  const [isLoading, setIsLoading] = useState(false) // 狀態

  function HandleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  async function 登入() {
    // post 結構: 路徑, 資料, headers
    // get 結構: 路徑, headers
    // const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, formData)
    // console.log(res);
    // navigate('/auth/login') // 當登入成功，轉址到登入頁
    setIsLoading(true)
    const res = await axios.post(`${VITE_APP_HOST}/users/sign_in`, formData)
    const { token } = res.data
    console.log(token);
    document.cookie = `token=${token};` // 先儲存
    setIsLoading(false)
    navigate('/todo') // 再轉址
  }

  return (<>Login
  
    <form action="">
      {JSON.stringify(formData)} <br />
      <input type="email" placeholder="Email" name="email" onChange={HandleChange} /> <br />
      <input type="password" placeholder="Password" name="password" onChange={HandleChange} /> <br />
      <button type="button"
        disabled={isLoading}
        onClick={() => {
        登入()
      }}>登入</button>
    </form>
  </>)
}


export default Login;
