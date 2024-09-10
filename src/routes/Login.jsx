import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import InputTemplate from "../components/InputTemplate";

export default function Login() {
    useEffect(() => {
        if (localStorage.getItem("authToken")) return profileNavigate("/");
    }, []);

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [resStatus, setResStatus] = useState("");
    const resStatusRef = useRef(null);

    const profileNavigate = useNavigate();

    return (
        <>
            <div className="w-full h-screen p-4 flex justify-center bg-purple-900 ">
                <div className="w-full h-96 p-4 flex flex-col items-center gap-6 border-radius bg-slate-200 laptop:w-3/4">
                    <h1 className="font-bold text-2xl tablet:text-4xl">
                        Login
                    </h1>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex flex-col gap-5"
                    >
                        <InputTemplate
                            type={"email"}
                            content={"Email"}
                            changeValue={emailValue}
                            setChangeValue={setEmailValue}
                        />
                        <InputTemplate
                            type={"password"}
                            content={"Password"}
                            changeValue={passwordValue}
                            setChangeValue={setPasswordValue}
                        />
                        <p ref={resStatusRef} className="text-center">
                            {resStatus}
                        </p>
                        <button
                            onClick={async (e) => {
                                try {
                                    const res = await axios.post("/login", {
                                        email: emailValue,
                                        password: passwordValue,
                                    });
                                    setResStatus(res.data.message);
                                    resStatusRef.current.style.color = "green";
                                    localStorage.setItem(
                                        "authToken",
                                        res.data.authToken
                                    );
                                    setTimeout(() => {
                                        profileNavigate("/");
                                    }, 1000);
                                } catch (err) {
                                    setResStatus(err.response.data);
                                    resStatusRef.current.style.color = "red";
                                }
                            }}
                            className="p-2 font-bold text-white bg-orange-500  border-radius active:opacity-70 tablet:text-xl"
                        >
                            Login
                        </button>
                        <p className="self-end tablet:text-xl">
                            Don't have an account?{" "}
                            <Link
                                to={"/register"}
                                className="breath-anim font-bold text-blue-800 active:opacity-70"
                            >
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
