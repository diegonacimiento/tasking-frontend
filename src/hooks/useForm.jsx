import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import usersService from '../services/user.service';
import { Context } from '../context/Context';

const service = new usersService();

export default function useForm() {
    const { setToken } = useContext(Context);

    const navigate = useNavigate();

    function showError(msg, element) {
        if (element.input) {
            const { span, input, error } = element;
            span.setAttribute("style", "color: rgb(238, 16, 16)");
            input.setAttribute("style", "color: rgb(238, 16, 16); border: 1px solid rgb(238, 16, 16);");
            error.textContent = msg;
        } else {
            element.current.setAttribute("style", "color: rgb(238, 16, 16)");
            element.current.textContent = msg;
        }
    }

    function resetInput(...elements) {
        elements.forEach(element => {
            const { span, input, error } = element;
            span.removeAttribute("style");
            input.removeAttribute("style");
            error.textContent = "";
        })
    }

    function hasDataInput(inputs, errorForm) {
        const elements = Object.entries(inputs);
        const results = elements.map((item) => {
            const { span, input } = item[1];
            const value = input.value;
            if (!value) {
                input.style.border = "1px solid rgb(238, 16, 16)";
                span.style.color = "rgb(238, 16, 16)";
                showError("Debe completar todos los campos", errorForm);
                return false;
            }
            resetInput(item[1]);
            return true;
        });
        const isCompleteInputs = results.every((value) => value === true);
        if(isCompleteInputs) showError("", errorForm);
        return isCompleteInputs;
    }

    function validateEmail(email) {
        const emailValue = email.input.value;
        const isValid = emailValidation(emailValue);
        if(!isValid) {
            showError("El email no es válido", email);
            return false;
        }
        resetInput(email);
        return true;
    }

    function validatePasswords(password, otherPassword) {
        resetInput(password, otherPassword);
        if(password.input.value.length < 6) {
            showError("Mínimo 6 carácteres", password);
            showError("", otherPassword);
            return false;
        }
        if(password.input.value !== otherPassword.input.value) {
            showError("Las contraseñas no coinciden", otherPassword);
            showError("", password);
            return false;
        }
        resetInput(password, otherPassword);
        return true;
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
                throw `Email o contraseña incorrecta`;
            } else if (error.response.status === 400) {
                throw `Ingrese su email y contraseña`;
            } else {
                return navigate("/serverError");
            }
        } 
    }

    return {
        hasDataInput,
        showError,
        resetInput,
        validateEmail,
        validatePasswords,
        sendFormLogin
    }
}

function emailValidation(emailValue) {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailRegex.test(emailValue)) {
        return true;
    } else {
        return false;
    }
}
