import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { VITE_APP_HOST } = import.meta.env;

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([
    {
      text: "把冰箱發霉的檸檬拿去丟",
      completed: true,
    },
    {
      text: "打電話叫媽媽匯款給我",
      completed: false,
    },
    {
      text: "整理電腦資料夾",
      completed: false,
    },
    {
      text: "繳電費水費瓦斯費",
      completed: false,
    },
    {
      text: "約 Vicky 禮拜三泡溫泉",
      completed: false,
    },
    {
      text: "約 Ada 禮拜四吃晚餐",
      completed: false,
    },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all"); // 當前選擇的篩選條件，預設為顯示全部待辦事項

  useEffect(() => {
    // 取得 Cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    console.log(cookieValue);

    // 預設 axios 的表頭
    axios.defaults.headers.common['Authorization'] = cookieValue;

    // 驗證登入
    axios.get(`${VITE_APP_HOST}/users/checkout`).then(res => {
      console.log(res);
    }).catch(err => {
      console.log('登入失敗啦', err);
      setTimeout(() => {
        navigate('/auth/login')
      }, 3000);
    });

  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      // 將新待辦事項添加到 todos 狀態中
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo(""); // 清空輸入框
    }
  };

  const removeTodo = (index) => {
    // 刪除指定的待辦事項
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const toggleTodo = (index) => {
    // 切換指定的待辦事項的狀態
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const clearCompletedTodos = () => {
    // 清除已完成的待辦事項
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  // 過濾待辦事項
  const filterTodos = () => {
    switch (currentFilter) {
      case "completed":
        // 已完成
        return todos.filter((todo) => todo.completed);
      case "active":
        // 待完成
        return todos.filter((todo) => !todo.completed);
      default:
        // 如果篩選條件不是上述兩者之一，返回所有待辦事項
        return todos;
    }
  };

  return (
    <div id="todoListPage" className="bg-half">
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input
              type="text"
              placeholder="新增待辦事項"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button type="button" onClick={addTodo}>+</button>
          </div>
          <div className="todoList_list">
            {todos.length > 0 && (
              <ul className="todoList_tab">
                <li>
                  <button type="button" className={currentFilter === "all" ? "active" : ""} onClick={() => setCurrentFilter("all")}>
                    全部
                  </button>
                </li>
                <li>
                  <button type="button" className={currentFilter === "active" ? "active" : ""} onClick={() => setCurrentFilter("active")}>
                    待完成
                  </button>
                </li>
                <li>
                  <button type="button" className={currentFilter === "completed" ? "active" : ""} onClick={() => setCurrentFilter("completed")}>
                    已完成
                  </button>
                </li>
              </ul>
            )}
            <div className="todoList_items">
              {todos.length === 0 ? (
                <div className="no-todos">
                  <p>目前尚無待辦事項</p>
                  <img
                    src="https://velariocream.github.io/react_final_task/assets/empty1-9abad42d.png"
                    alt="Empty"
                  />
                </div>
              ) : (
                <ul className="todoList_item">
                  {filterTodos().map((todo, index) => (
                    <li key={index}>
                      <label className="todoList_label">
                        <input className="todoList_input"
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(index)}
                        />
                        <span>{todo.text}</span>
                      </label>
                      <button type="button" onClick={() => removeTodo(index)}></button>
                    </li>
                  ))}
                </ul>
              )}

              {todos.length > 0 && (
                <div className="todoList_statistics">
                  <p> {todos.filter(todo => !todo.completed).length} 個待完成項目</p>
                  <button type="button" className="todoList_clear" onClick={clearCompletedTodos}>
                    清除已完成項目
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
