import React, { useState, useEffect } from "react";
import supabase from "../services/SupabaseClient";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*');
                if (error) throw error;
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <div className="product-page">
                <div className="container mt-4">
                    <h3 className="mb-5 text-center text-light">Daftar Produk EcoShop</h3>
                    <div className="row pb-5">
                        {products.map((product) => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="img-products"
                                        />
                                        <h6 className="card-title">{product.name}</h6>
                                        <p className="card-text">Harga: Rp {product.price}</p>
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="btn-lihat-detail-produk"
                                        >
                                            Lihat Detail Produk
                                        </Link>
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
