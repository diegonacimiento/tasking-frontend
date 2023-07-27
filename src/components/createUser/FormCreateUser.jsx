import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import usersService from "../../services/user.service";
import Loading from "../loading/Loading";
import useForm from "../../hooks/useForm"

const service = new usersService();

export default function FormCreateUser() {
    const navigate = useNavigate();
    const { hasDataInput, showError, validateEmail, validatePasswords, sendFormLogin } = useForm();

    const [loading, setLoading] = useState(false);
    const [formRef, setFormRef] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const errorForm = useRef(null);
    const labelUser = useRef(null);
    const labelEmail = useRef(null);
    const labelPassword = useRef(null);
    const labelConfirmPassword = useRef(null);

    useEffect(() => {
        setFormRef({
            username: {
                span: labelUser.current.children[0],
                input: labelUser.current.children[1],
                error: labelUser.current.children[2]  
            },
            email: {
                span: labelEmail.current.children[0],
                input: labelEmail.current.children[1],
                error: labelEmail.current.children[2]  
            },
            password: {
                span: labelPassword.current.children[0],
                input: labelPassword.current.children[1].children[0],
                error: labelPassword.current.children[2]  
            },
            confirmPassword: {
                span: labelConfirmPassword.current.children[0],
                input: labelConfirmPassword.current.children[1].children[0],
                error: labelConfirmPassword.current.children[2]  
            },
        });
    }, [])

    function toggleShowPassword() {
        setShowPassword(prevState => !prevState);
    }

    function toggleShowConfirmPassword() {
        setShowConfirmPassword(prevState => !prevState);
    }

    function checkForm() {
        const isCompleteInputs = hasDataInput(formRef, errorForm);
        if(isCompleteInputs) {
            const isValidateEmail = validateEmail(formRef.email);
            const isValidatePasswords = validatePasswords(formRef.password, formRef.confirmPassword);
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
                showError("Usuario en uso, elige otro", formRef.username);
            } else if (containEmail) {
                showError("Email en uso, elige otro", formRef.email);
            }
        } finally {
            setLoading(false)
        }
    }

    function handleCreate(e) {
        e.preventDefault();

        const isFormComplete = checkForm();

        if(!isFormComplete) return null;

        const username = formRef.username.input.value.toLowerCase();
        const email = formRef.email.input.value;
        const password = formRef.password.input.value;

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
            
            <button title="Crear usuario" className="button">
                {loading ? <Loading /> : "Crear"}
            </button>
            
            <p id="error" ref={errorForm}></p>
        </form>
    );
}