import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Context } from "../../context/Context";
import usersService from "../../services/user.service";
import Loading from "../loading/Loading";
import useForm from "../../hooks/useForm"

const service = new usersService();

export default function FormCreateUser() {
    const [loading, setLoading] = useState(false);
    const [formRef, setFormRef] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const errorForm = useRef(null);
    const labelUser = useRef(null);
    const labelEmail = useRef(null);
    const labelPassword = useRef(null);
    const labelConfirmPassword = useRef(null);

    const { sendFormLogin } = useForm();

    useEffect(() => {
        setFormRef([
            {
                span: labelUser.current.children[0],
                input: labelUser.current.children[1],
                error: labelUser.current.children[2]  
            },
            {
                span: labelEmail.current.children[0],
                input: labelEmail.current.children[1],
                error: labelEmail.current.children[2]  
            },
            {
                span: labelPassword.current.children[0],
                input: labelPassword.current.children[1].children[0],
                error: labelPassword.current.children[2]  
            },
            {
                span: labelConfirmPassword.current.children[0],
                input: labelConfirmPassword.current.children[1].children[0],
                error: labelConfirmPassword.current.children[2]  
            },
        ]);
    }, [])

    const { emailValidation } = useContext(Context);

    function validateEmail() {
        const email = formRef[1].input.value;
        const isValid = emailValidation(email);
        if(!isValid) {
            showError("El email no es válido", 1);
            return false;
        }
        resetInput([1]);
        return true;
    }

    function showError(msg, order) {
        if (order !== undefined) {
        const { span, input, error } = formRef[order];
        span.setAttribute("style", "color: rgb(238, 16, 16)");
        input.setAttribute("style", "color: rgb(238, 16, 16); border: 1px solid rgb(238, 16, 16);");
        error.textContent = msg;
        } else {
        errorForm.current.setAttribute("style", "color: rgb(238, 16, 16)");
        errorForm.current.textContent = msg;
        }
    }

    function validatePasswords() {
        const password = formRef[2];
        const confirmPassword = formRef[3];
        resetInput([2, 3]);
        if(password.input.value.length < 6) {
            showError("Mínimo 6 carácteres", 2);
            showError("", 3);
            return false;
        }
        if(password.input.value !== confirmPassword.input.value) {
            showError("Las contraseñas no coinciden", 3);
            showError("", 2);
            return false;
        }
        resetInput([2, 3]);
        return true;
    }

    function toggleShowPassword() {
        setShowPassword(prevState => !prevState);
    }

    function toggleShowConfirmPassword() {
        setShowConfirmPassword(prevState => !prevState);
    }

    function resetInput(orders) {
        orders.forEach(order => {
            const { span, input, error } = formRef[order];
            span.removeAttribute("style");
            input.removeAttribute("style");
            error.textContent = "";
        })
    }

    function hasDataInput(inputs) {
        const orders = inputs ?? [0, 1, 2, 3];
        const results = orders.map((item) => {
            const { span, input } = formRef[item];
            const value = input.value;
            if (!value) {
                input.style.border = "1px solid rgb(238, 16, 16)";
                span.style.color = "rgb(238, 16, 16)";
                showError("Debe completar todos los campos");
                return false;
            }
            resetInput([item]);
            return true;
        });
        const isCompleteInputs = results.every((value) => value === true);
        if(isCompleteInputs) showError("");
        return isCompleteInputs;
    }

    function checkForm() {
        const isCompleteInputs = hasDataInput();
        if(isCompleteInputs) {
            const isValidateEmail = validateEmail();
            const isValidatePasswords = validatePasswords();
            if(isValidateEmail && isValidatePasswords) {
                return true;
            }
        }
        return false;
    }

    async function sendForm(body) {
        try {
            await service.create(body);
            const { email, password } = body;
            const bodyLogin = {
                username: `${email}`,
                password: `${password}`,
            };
            await sendFormLogin(bodyLogin);
        } catch (e) {
            if (e.response.status === 500) {
                return navigate("/serverError");
            }
            const containId = e.response.data.errors[0].message.includes("id");
            const containEmail = e.response.data.errors[0].message.includes("email");
            if (containId) {
                showError("Usuario en uso, elige otro", 0);
            } else if (containEmail) {
                showError("Email en uso, elige otro", 1);
            }
        } finally {
            setLoading(false)
        }
    }

    function handleCreate(e) {
        e.preventDefault();

        const isFormComplete = checkForm();

        if(!isFormComplete) return null;

        const username = formRef[0].input.value.toLowerCase();
        const email = formRef[1].input.value;
        const password = formRef[2].input.value;

        const body = {
        id: `${username}`,
        email: `${email}`,
        password: `${password}`,
        };

        setLoading(true);
        
        sendForm(body);
        
    }

    return (
        <form onSubmit={handleCreate}>
            <label ref={labelUser}>
                <span>Usuario</span>
                <input type={"text"} />
                <p className="error"></p>
            </label>
            <label ref={labelEmail}>
                <span>Correo electrónico</span>
                <input type={"email"} />
                <p className="error"></p>
            </label>
            <label ref={labelPassword}>
                <span>Contraseña</span>
                <div className="contain-input-button-pass">
                    <input type={ showPassword ? "text" : "password" } />
                    <button 
                        onClick={toggleShowPassword} 
                        title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                        className="view-password" 
                    >
                        { showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
                    </button>
                </div>
                <p className="error"></p>
            </label>
            <label ref={labelConfirmPassword}>
                <span>Confirmar contraseña</span>
                <div className="contain-input-button-pass">
                    <input type={ showConfirmPassword ? "text" : "password"} />
                    <button 
                        onClick={toggleShowConfirmPassword} 
                        title={ showConfirmPassword ? "Ocultar contraseña" : "Ver contraseña" }
                        className="view-password"
                    >
                        { showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
                    </button>
                </div>
                <p className="error"></p>
            </label>
            <label id="label-button">
                <button title="Crear usuario" className="button">
                    {loading ? <Loading /> : "Crear"}
                </button>
            </label>
            
            <p id="error" ref={errorForm}></p>
        </form>
    );
}