
import './App.css'
import { Route, Routes, NavLink } from 'react-router-dom'
import Auth from './views/Auth'
import SignUp from './views/SignUp'
import Login from './views/Login'
import Todo from './views/Todo'
import NotFound from './views/NotFound'

// 路由加入技巧
// ====================
// 建立元件
// 匯入元件並撰寫路由表
// 加入連結

function App() {

  const style = ({ isActive }) => {
    return {
      color: isActive ? 'red' : null
    }
  }

  return (
    <>
      <nav>
        <h1>
          <NavLink to="/todo" style={style}>ONLINE TODO LIST</NavLink>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#">
              <span>王小明的待辦</span>
            </a>
          </li>
          <li>
            <NavLink to="/auth/login" style={style}>登出</NavLink>
          </li>
        </ul>
        {/* <NavLink to="/auth/sign_up" style={style}>註冊</NavLink> | 
        <NavLink to="/auth/login" style={style}>登入</NavLink> |
        <NavLink to="/todo" style={style}>Todo</NavLink> */}
      </nav>
      <Routes>
        {/* 路由表 */}

        {/* /auth 共用版型 */}
        {/* /auth/sign_up */}
        {/* /auth/sign_in */}
        <Route path="/auth" element={<Auth />}>
          <Route path="sign_up" element={<SignUp />} /> {/*匯入元件並撰寫路由表*/}
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/todo" element={<Todo />} />
        {/* 米字號代表全部, 由上而下都找不到的話跑這個路由 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
