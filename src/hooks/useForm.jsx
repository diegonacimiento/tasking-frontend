import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import usersService from '../services/user.service';
import { Context } from '../context/Context';

const service = new usersService();

export default function useForm() {
    const { setToken } = useContext(Context);

    const navigate = useNavigate();

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
                throw `Email o contraseña incorrecta`;
            } else if (error.response.status === 400) {
                throw `Ingrese su email y contraseña`;
            } else {
                return navigate("/serverError");
            }
        } 
    }

    return {
        sendFormLogin
    }
}
