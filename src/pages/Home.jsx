import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <div className="hero-section">
                <div className="container">
                    <h1>Welcome to Eco Shop <br />
                        <span className="fw-light">Your Choice for</span><br />
                        <span style={{ color: "#66FF50" }}>Eco-Friendly Shopping</span>
                    </h1>
                    <p>Embrace Sustainability. Choose Green Living. <br /> Your Eco-Friendly Hub for Conscious Shopping</p>
                    <div className="d-flex justify-content-end custom-center">
                        <Link to="/products" className="shop-now">Shop Now <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M7.5 17.5039L17.5 7.50391" stroke="#24771A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.5 7.50391H17.5V17.5039" stroke="#24771A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></Link>
                    </div>
                </div>
            </div>
            <div className='container container-whyous why-ous pb-5'>
                <h1 className='text-center mb-5'>Why Choose</h1>
                <div className='row '>
                    <div className='card col-md-3 col-10 mx-auto'>
                        <div className="d-flex justify-content-center">
                            <img src="/whyous/1.png" alt="" />
                        </div>
                        <div className='title'>Sustainable Products</div>
                        <p>Explore our carefully curated
                            selection of sustainable products,  each designed to reduce your  carbon footprint</p>
                    </div>
                    <div className=' card col-md-3 col-10 mx-auto'>
                        <div className="d-flex justify-content-center">
                            <img src="/whyous/2.png" alt="" />
                        </div>
                        <div className='title'>Eco-Friendly Choices</div>
                        <p>
                            Make conscious choices with our eco friendly products, knowing  that your purchases promote ethical sourcing and responsible manufacturing practices.
                        </p>
                    </div>
                    <div className='card col-md-3 col-10 mx-auto'>
                        <div className="d-flex justify-content-center">
                            <img src="/whyous/3.png" alt="" />
                        </div>
                        <div className='title'>High-Quality Selection</div>
                        <p>Invest in long-lasting and reliable
                            products that meet our stringent
                            quality standards, ensuring your
                            satisfaction and the longevity of
                            your purchases.</p>
                    </div>
                    <div className='card col-md-3 col-10 mx-auto'>
                        <div className="d-flex justify-content-center">
                            <img src="/whyous/4.png" alt="" />
                        </div>
                        <div className='title'>Sustainable Packaging</div>
                        <p>Our sustainable packaging ensures
                            that your orders arrive safely
                            while minimizing their impact on
                            the planet.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
