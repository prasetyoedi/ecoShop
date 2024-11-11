import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://672f3e07229a881691f24a86.mockapi.io/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <>
            <div className="product-page">
                <div className="container mt-4 ">
                    <h3 className="mb-5 text-center text-light">Daftar Produk EcoShop</h3>
                    <div className="row pb-5">
                        {products.map((product) => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <img src={product.imageUrl} alt={product.name} className="img-products" />
                                        <h6 className="card-title">{product.name}</h6>
                                        <p className="card-text">Harga: Rp {product.price}</p>
                                        <Link to={`/product/${product.id}`} className="btn-buy text-decoration-none">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductPage;
