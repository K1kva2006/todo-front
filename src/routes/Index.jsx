import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "../components/Loading";

import todoIcon from "../assets/todo-icon.svg";
import removeTodoIcon from "../assets/remove-todo-icon.svg";

export default function Index() {
    const [loading, setLoading] = useState(true);
    const navigateBack = useNavigate();
    const [userData, setUserData] = useState({ todoList: [] });
    const [resStatus, setResStatus] = useState("");
    const resStatusRef = useRef(null);

    const [getData, setGetData] = useState(false);

    const [taskValue, setTaskValue] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get("/profile", {
                    headers: {
                        "x-auth-token": localStorage.getItem("authToken"),
                    },
                });
                setUserData(res.data);
            } catch (err) {
                localStorage.removeItem("authToken");
                navigateBack("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [getData]); // მონაცმების განახლების მიხედვით ხელახლა ჩატვირთვა

    const addNote = async () => {
        try {
            const res = await axios.post(
                "/add/todo",
                {
                    todo: taskValue,
                },
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("authToken"),
                    },
                }
            );
            setGetData((current) => !current); 
            setResStatus(res.data);
            resStatusRef.current.style.color = "green";
            setTaskValue("")
        } catch (err) {
            setResStatus(err.response.data);
            resStatusRef.current.style.color = "red";
        }
    };

    const handleCheckboxChange = async (todoId, checked) => {
        try {
            await axios.post(
                "/change/todo/mark",
                {
                    todoId: todoId,
                    mark: checked,
                },
                {
                    headers: {
                        "x-auth-token": localStorage.getItem("authToken"),
                    },
                }
            );
            // აიძულებს მონაცემების განახლებას ჩექბოქსის ცვლილების შემდეგ
            setGetData((current) => !current); // მონაცემების ხელახლა ჩატვირთვა
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            const res = await axios.delete("/delete/todo", {
                headers: {
                    "x-auth-token": localStorage.getItem("authToken"),
                },
                data: {
                    noteId: noteId,
                },
            });
            setGetData((current) => !current);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    if (loading) return <Loading />;
    return (
        <>
            <div className="w-full h-screen p-4 flex justify-center bg-purple-900">
                <div className="w-full h-full p-4 flex flex-col items-center gap-6 border-radius bg-slate-200 laptop:max-w-7xl">
                    <div className="flex self-start items-center gap-1">
                        <h1 className="font-bold text-2xl text-blue-900 tablet:text-4xl">
                            To-Do List
                        </h1>
                        <img src={todoIcon} alt="todo icon" />
                        <span
                            onClick={() => {
                                localStorage.removeItem("authToken");
                                navigateBack("/login");
                            }}
                            className="ml-10 text-xl cursor-pointer font-bold"
                        >
                            Log out
                        </span>
                    </div>

                    <div className="relative flex w-full ml-7">
                        <input
                            type="text"
                            placeholder="Add your task"
                            required
                            minLength={6}
                            value={taskValue}
                            onChange={(e) => setTaskValue(e.target.value)}
                            className="absolute w-64 break-words p-3 pl-4 pr-14 outline-none overflow-x-visible text-black bg-slate-300 border-radius-2 laptop:w-96 laptop:text-xl"
                        />
                        <button
                            onClick={addNote}
                            className="absolute translate-x-52 p-3 pl-8 pr-8 text-white font-bold bg-orange-500 border-radius-2 laptop:translate-x-80 laptop:text-xl laptop:pl-8 laptop:pr-8"
                        >
                            Add
                        </button>

                        <p ref={resStatusRef} className="absolute top-16">
                            {resStatus}
                        </p>
                        <div className="max-h-96 h-full mt-24 flex flex-col overflow-y-visible">
                            {userData.todoList?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="pr-8 max-w-lg w-full flex items-center gap-4"
                                    >
                                        <input
                                            type="checkbox"
                                            title="Done"
                                            checked={item.mark || false}
                                            onChange={(e) =>
                                                handleCheckboxChange(
                                                    item._id,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <p className="break-all leading-5">
                                            {item.todo}
                                        </p>
                                        <button
                                            onClick={(e) => {
                                                deleteNote(item._id);
                                            }}
                                        >
                                            <img
                                                src={removeTodoIcon}
                                                alt="delete"
                                            />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
