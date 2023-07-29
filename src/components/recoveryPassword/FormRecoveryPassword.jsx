import React, { useState, useRef, useEffect } from "react";
import usersService from "../../services/user.service";
import Loading from "../loading/Loading";
import useForm from "../../hooks/useForm";

const service = new usersService();

export default function FormRecoveryPassword({ navigate }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState({});

    const labelEmail = useRef(null);
    const error = useRef(null);

    useEffect(() => {
        setEmail({
        span: labelEmail.current.children[0],
        input: labelEmail.current.children[1],
        error: error.current,
        });
    }, [])

    const { showError, validateEmail, resetInput, hasDataInput } = useForm();

    function checkForm() {
        const isFormComplete = hasDataInput({ email }, error, "Ingrese su email");
        if(isFormComplete) {
            const isValidateEmail = validateEmail(email);
            return isValidateEmail;
        }
        return false;
    }

    async function sendForm(body) {
        try {
            await service.recoveryPassword(body);
            error.current.setAttribute("style", "color: green");
            error.current.textContent = `Email enviado con éxito`;
        } catch (e) {
        if (e.response.status === 404 || e.response.status === 401) {
            showError("El email no está vinculado", email);
        } else {
            return navigate("/serverError");
        }
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        resetInput(email);
        const isValidateForm = checkForm();
        if (!isValidateForm) return null;
        setLoading(true);
        const body = { email: `${email.input.value}` };
        sendForm(body);
    }

    return (
        <form onSubmit={handleSubmit}>
        <label ref={labelEmail}>
            <span>Email</span>
            <input type={"email"} />
        </label>
        <button title="Enviar" className="button">
            {loading ? <Loading /> : "Enviar"}
        </button>
        <p id="error" ref={error}></p>
        </form>
    );
}
