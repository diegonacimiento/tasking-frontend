import React from 'react';
import "./serverError.css";

export default function ServerError() {
    return (
        <main className='main-server-error'>
            <div>
                <div className='contain-image'></div>
                <h2>
                    El servidor no se encuentra funcionando <br />
                    Por favor intente de nuevo
                    más tarde
                </h2>
            </div>
        </main>
    );
}
