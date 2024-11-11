import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/Footer";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://672f3e07229a881691f24a86.mockapi.io/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-center my-5">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div className="spinner"></div>
                <span className="ms-3">Loading ...</span>
            </div>

        </div>;
    }

    if (!product) {
        return (
            <div className="text-center my-5">
                <h4>Product not found</h4>
                <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
            </div>
        );
    }

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-8">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <h4 className="text-primary">Rp {product.price},-</h4>
                        <a href="https://api.whatsapp.com/send/?phone=6283134339542&text=Hello! I am interested in your product, ${product.name}."
                            className="btn btn-success mt-3"
                            target="_blank"
                            rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="white" className="me-2">
                                <path d="M16.05 13C16.8 13 17.46 12.59 17.8 11.97L21.38 5.48C21.75 4.82 21.27 4 20.51 4H5.71L4.77 2H1.5V4H3.5L7.1 11.59L5.75 14.03C5.02 15.37 5.98 17 7.5 17H19.5V15H7.5L8.6 13H16.05ZM6.66 6H18.81L16.05 11H9.03L6.66 6ZM7.5 18C6.4 18 5.51 18.9 5.51 20C5.51 21.1 6.4 22 7.5 22C8.6 22 9.5 21.1 9.5 20C9.5 18.9 8.6 18 7.5 18ZM17.5 18C16.4 18 15.51 18.9 15.51 20C15.51 21.1 16.4 22 17.5 22C18.6 22 19.5 21.1 19.5 20C19.5 18.9 18.6 18 17.5 18Z" />
                            </svg>
                            Buy Now
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;
