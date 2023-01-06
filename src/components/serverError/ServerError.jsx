import React from 'react';
import "./serverError.css";
import Header from '../header/Header';
import Footer from '../footer/Footer';

export default function ServerError() {
    return (
        <>
            <Header />
            <main className='main-serverError'>
                <div>
                    <div className='contain-image'></div>
                        <h2>
                            El servidor no se encuentra funcionando. <br />
                            Por favor intente de nuevo
                            más tarde.
                        </h2>
                </div>
            </main>
            <Footer />
        </>
    );
}
