import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import WhyOus from "../components/WhyOus";
import Chatbot from "../components/Chatbot";
import About from "../components/About";

const Home = () => {
    return (
        <>
            <div className="hero-section">
                <div className="container">
                    <h1>Selamat Datang di EcoShop <br />
                        <span className="fw-light">Pilihan Anda untuk</span><br />
                        <span style={{ color: "#66FF50" }}>Belanja Ramah Lingkungan</span>
                    </h1>
                    <p>Rangkul Keberlanjutan. Pilih Hidup Ramah Lingkungan. <br /> Pusat Belanja Anda yang Peduli Lingkungan</p>
                    <div className="d-flex justify-content-end custom-center">
                        <Link to="/products" className="shop-now">Beli Sekarang <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M7.5 17.5039L17.5 7.50391" stroke="#24771A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.5 7.50391H17.5V17.5039" stroke="#24771A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></Link>
                    </div>
                </div>
            </div>
            <WhyOus />
            <About />
            <Chatbot />
            <Footer />
        </>
    );
};

export default Home;
