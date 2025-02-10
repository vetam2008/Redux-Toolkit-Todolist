import { addTask, deleteTask, toggleTask } from "../Redux/ToDoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import './ToDoListStyle.css';

const ToDoList = () => {
    const dispatch = useDispatch();
    const todoSelector = useSelector((state) => state.todos);

    const [taskInput, setTaskInput] = useState("");

    const completedTasks = todoSelector.filter((todo) => todo.completed).length;
    const todoSelect = `: ${completedTasks} / ${todoSelector.length}`;

    const handleAddTask = () => {
        if (taskInput.trim()) {
            dispatch(addTask({
                id: Date.now(),
                task: taskInput,
                completed: false,
            }));
            setTaskInput("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && taskInput.trim()) {
            handleAddTask();
        }
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    const handleToggleTask = (id) => {
        dispatch(toggleTask(id));
    };

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            savedTasks.forEach(task => {
                dispatch(addTask(task));
            });
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(todoSelector));
    }, [todoSelector]);

    return (
        <div>
            <h1>Список завдань</h1>
            <h2>Виконано{todoSelect}</h2>

            <div className="TaskContainer">
                <input
                    type="text"
                    id="task"
                    placeholder="Введіть завдання, натисніть Enter або кнопку праворуч"
                    className="taskInput"
                    autoFocus
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)} 
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="addTaskButton"
                    onClick={handleAddTask}
                >
                </button>
            </div>

            <div className="taskList">
                <ul>
                    {todoSelector.map((todo) => (
                        <li className="taskItem" key={todo.id}>
                            <small>{new Date().toLocaleString()}</small>
                            <input 
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTask(todo.id)}   />
                            <p className={todo.completed ? "completed" : ""}>
                                {todo.task}
                            </p>
                            <button
                                className="deleteTaskButton"
                                onClick={() => handleDeleteTask(todo.id)} >
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;