import React, { useState, useRef, useContext } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Context } from '../../context/Context';
import Loading from '../loading/Loading';
import usersService from '../../services/user.service';

const service = new usersService();

export default function FormLogin({ navigate }) {

    const { setToken } = useContext(Context);

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const error = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    function showError(msg) {
        error.current.textContent = msg;
    }

    function togglePasswordVisibility(e) {
        e.preventDefault();
        setShowPassword(prevState => !prevState);
    }

    async function sendFormLogin(body) {
        try {
            const response = await service.loginUser(body);
            localStorage.setItem("user", `${response.data.user.id}`);
            localStorage.setItem("email", `${response.data.user.email}`);
            if (response.data.token) {
                localStorage.setItem("token", `${response.data.token}`);
                setToken(response.data.token);
                return navigate("/");
            }
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 404) {
                showError(`Email o contraseña incorrecta`);
            } else if (error.response.status === 400) {
                showError(`Ingrese su email y contraseña`)
            } else {
                showError("Ha ocurrido un error")
                return navigate("/serverError");
            }
        } finally {
            setLoading(false);
        }
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

        sendFormLogin(body);
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
                    onClick={togglePasswordVisibility}
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
