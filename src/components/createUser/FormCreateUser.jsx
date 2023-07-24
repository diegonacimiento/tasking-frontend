import React from 'react';

export default function FormCreateUser() {
    return (
        <form onClick={send}>
            <label>
            <span className="span-user">Usuario</span>
            <input
                onChange={() => {
                inputDefault("user");
                document.getElementById("error").textContent = "";
                }}
                className="user"
                type={"text"}
            />
            <p className="error e-user"></p>
            </label>
            <label>
            <span className="span-mail">Correo electrónico</span>
            <input
                onChange={() => {
                emailValidation();
                document.getElementById("error").textContent = "";
                }}
                className="email"
                type={"email"}
            />
            <p className="error e-mail"></p>
            </label>
            <label className="label-pass">
            <span className="span-pass">Contraseña</span>
            <div className="contain-input-button-pass">
                <input
                onChange={() => {
                    passwordValidation();
                    document.getElementById("error").textContent = "";
                }}
                className="newPassword"
                type={"password"}
                />
                <button onClick={viewPasswordNP} className="view-password">
                {modeViewNP == "invisible" ? (
                    <AiOutlineEyeInvisible />
                ) : (
                    <AiOutlineEye />
                )}
                </button>
            </div>
            <p className="error e-pass"></p>
            </label>
            <label className="label-confirm-pass">
            <span className="span-con-pass">Confirmar contraseña</span>
            <div className="contain-input-button-pass">
                <input
                onChange={() => {
                    passwordValidation();
                    document.getElementById("error").textContent = "";
                }}
                className="confirmNewPassword"
                type={"password"}
                />
                <button onClick={viewPasswordCNP} className="view-password">
                {modeViewCNP == "invisible" ? (
                    <AiOutlineEyeInvisible />
                ) : (
                    <AiOutlineEye />
                )}
                </button>
            </div>
            <p className="error e-con-pass"></p>
            </label>
            <label id="label-button">
            <button onClick={createUser} className="button">
                {loading ? <Loading /> : "Crear"}
            </button>
            </label>
        </form>
    )
}
