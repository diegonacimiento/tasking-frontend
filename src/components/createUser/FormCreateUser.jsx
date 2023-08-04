import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loading from "../loading/Loading";
import useForm from "../../hooks/useForm"
import usersService from "../../services/user.service";

const service = new usersService();

export default function FormCreateUser() {
    const navigate = useNavigate();
    const { hasDataInput, showError, validateEmail, validatePasswords, sendFormLogin } = useForm();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const errorForm = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        setForm({
            username: {
                span: formRef.current.children[0].children[0],
                input: formRef.current.children[0].children[1],
                error: formRef.current.children[0].children[2]  
            },
            email: {
                span: formRef.current.children[1].children[0],
                input: formRef.current.children[1].children[1],
                error: formRef.current.children[1].children[2]  
            },
            password: {
                span: formRef.current.children[2].children[0],
                input: formRef.current.children[2].children[1],
                error: formRef.current.children[2].children[3]  
            },
            confirmPassword: {
                span: formRef.current.children[3].children[0],
                input: formRef.current.children[3].children[1],
                error: formRef.current.children[3].children[3]  
            },
        });
    }, [])

    function toggleShowPassword(e) {
        e.preventDefault();
        setShowPassword(prevState => !prevState);
    }

    function toggleShowConfirmPassword(e) {
        e.preventDefault();
        setShowConfirmPassword(prevState => !prevState);
    }

    function checkForm() {
        const isCompleteInputs = hasDataInput(form, errorForm);
        if(isCompleteInputs) {
            const isValidateEmail = validateEmail(form.email);
            const isValidatePasswords = validatePasswords(form.password, form.confirmPassword);
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
            console.log(e)
            if (e.response.status === 500) {
                return navigate("/server-error");
            }
            const containId = e.response?.data?.errors[0]?.message.includes("id");
            const containEmail = e.response?.data?.errors[0]?.message.includes("email");
            if (containId) {
                showError("Usuario en uso, elige otro", form.username);
            } else if (containEmail) {
                showError("Email en uso, elige otro", form.email);
            }
        } finally {
            setLoading(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        const isValidateForm = checkForm();

        if(!isValidateForm) return null;

        const username = form.username.input.value.toLowerCase();
        const email = form.email.input.value;
        const password = form.password.input.value;

        const body = {
        id: `${username}`,
        email: `${email}`,
        password: `${password}`,
        };

        setLoading(true);
        
        sendForm(body);
        
    }

    return (
        <form onSubmit={handleSubmit} ref={formRef}>

            <label>
                <span>Usuario</span>
                <input type={"text"} name="username" autoComplete="off" />
                <p className="error"></p>
            </label>

            <label>
                <span>Email</span>
                <input type={"email"} name="email" />
                <p className="error"></p>
            </label>

            <label>
                <span>Contraseña</span>
                <input type={ showPassword ? "text" : "password" } name="new-password" />
                <button 
                    onClick={toggleShowPassword} 
                    title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    className="show-password"
                    type="button"
                >
                    { showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
                </button>
                <p className="error"></p>
            </label>

            <label>
                <span>Confirmar contraseña</span>
                <input type={ showConfirmPassword ? "text" : "password"} name="confirm-password" />
                <button 
                    onClick={toggleShowConfirmPassword} 
                    title={ showConfirmPassword ? "Ocultar contraseña" : "Ver contraseña" }
                    className="show-password"
                    type="button"
                >
                    { showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
                </button>
                <p className="error"></p>
            </label>
            
            <button title="Crear usuario" className="button" type="submit">
                {loading ? <Loading /> : "Crear"}
            </button>
            
            <p id="error" ref={errorForm}></p>
        </form>
    );
}