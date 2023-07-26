import React, { useState, useRef } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loading from '../loading/Loading';
import useForm from "../../hooks/useForm"

export default function FormLogin() {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const { sendFormLogin } = useForm();

    const error = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    function showError(msg) {
        error.current.textContent = msg;
    }

    function toggleShowPassword(e) {
        e.preventDefault();
        setShowPassword(prevState => !prevState);
    }
    
    function handleLogin(e) {
        e.preventDefault();

        const valueEmail = email.current.value;
        const valuePassword = password.current.value;

        if (!valueEmail || !valuePassword) return showError(`Ingrese su email y contraseña`);

        const body = {
            username: `${valueEmail}`,
            password: `${valuePassword}`,
        };

        setLoading(true);

        async function responseSendForm() {
            try {
                await sendFormLogin(body);
            } catch (error) {
                showError(error);
            } finally {
                setLoading(false);
            }
        }
        responseSendForm();
    }

    return (
        <form className="main-login__login" onSubmit={handleLogin}>
            <input id="input-email" type={"email"} placeholder="Email" ref={email} />
            <div className="password-contain">
                <input
                    className="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    ref={password}
                />
                <button
                    title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    onClick={toggleShowPassword}
                    className="view-password"
                >
                    { showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
                </button>
            </div>

            <button title='Iniciar sesión' className="button">
                { loading ? <Loading /> : "Iniciar sesión" }
            </button>
            <p id="error" ref={error}></p>
        </form>
    )
}
