import { Outlet } from "react-router-dom";

const Auth = () => {
  return (<>
    <h1>
      共用元件，共用區塊
    </h1>

    {/* 指定渲染位置 */}
    <Outlet />
  </>)
}

export default Auth;