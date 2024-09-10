import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import InputTemplate from "../components/InputTemplate";

export default function Register() {
    const profileNavigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("authToken")) return profileNavigate("/");
    }, []);

   const navigateToLogin = useNavigate()

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [repeatPasswordValue, setRepeatPasswordValue] = useState("");

    const [resStatus, setResStatus] = useState("");
    const resStatusRef = useRef(null);

    return (
        <>
            <div className="w-full h-screen p-4 flex justify-center bg-purple-900">
                <div className="w-full h-max p-4 pl-8 flex flex-col items-center gap-6 border-radius bg-slate-200 laptop:w-3/4">
                    <h1 className="font-bold text-2xl tablet:text-4xl">
                        Register
                    </h1>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex flex-col gap-5 max-w-96 w-full"
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
                        <InputTemplate
                            type={"password"}
                            content={"Repeat Password"}
                            changeValue={repeatPasswordValue}
                            setChangeValue={setRepeatPasswordValue}
                        />
                        <p ref={resStatusRef} className="text-center">
                            {resStatus}
                        </p>
                        <button
                            onClick={async () => {
                                if (passwordValue !== repeatPasswordValue)
                                    return setResStatus(
                                        "The repeated password is incorrect"
                                    );
                                try {
                                    const res = await axios.post("/register", {
                                        email: emailValue,
                                        password: passwordValue,
                                    });
                                    setResStatus(res.data);
                                    resStatusRef.current.style.color = "green";
                                    setTimeout(() => {
                                        navigateToLogin("/login")
                                    },1000)
                                } catch (err) {
                                    setResStatus(err.response.data);
                                    resStatusRef.current.style.color = "red";
                                }
                            }}
                            className="p-2 font-bold text-white bg-orange-500  border-radius active:opacity-70 tablet:text-xl"
                        >
                            Register
                        </button>
                        <p className="self-end tablet:text-xl">
                            Do you already have an account?{" "}
                            <Link
                                to={"/login"}
                                className="breath-anim font-bold text-blue-800 active:opacity-70"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
