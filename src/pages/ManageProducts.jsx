import React, { useState } from 'react';
import useProducts from '../hooks/useProducts';
import Footer from '../components/Footer';

const ManageProducts = () => {
    // Destrukturisasi nilai dari custom hook 'useProducts'
    const {
        currentProducts,  // Produk yang ditampilkan pada halaman saat ini
        currentPage,      // Halaman yang sedang aktif
        totalPages,       // Jumlah total halaman
        handleNextPage,   // Fungsi untuk berpindah ke halaman berikutnya
        handlePrevPage,   // Fungsi untuk berpindah ke halaman sebelumnya
        addNewProduct,    // Fungsi untuk menambah produk baru
        editProduct,      // Fungsi untuk mengedit produk yang ada
        deleteExistingProduct,  // Fungsi untuk menghapus produk yang ada
    } = useProducts();

    // State untuk menyimpan data produk baru yang akan ditambahkan
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
    // State untuk menyimpan file gambar produk baru
    const [newImage, setNewImage] = useState(null);
    // State untuk menyimpan data produk yang sedang diedit
    const [editModal, setEditModal] = useState({ id: '', name: '', description: '', price: '' });
    // State untuk menyimpan file gambar produk yang sedang diedit
    const [editImage, setEditImage] = useState(null);
    // State untuk mengontrol visibilitas modal Edit Produk
    const [showEditModal, setShowEditModal] = useState(false);
    // State untuk mengontrol visibilitas modal Tambah Produk
    const [showAddModal, setShowAddModal] = useState(false);

    // Fungsi untuk menambah produk baru
    const handleAddProduct = () => {
        // Panggil fungsi 'addNewProduct' dari hook 'useProducts'
        addNewProduct(newProduct, newImage, () => {
            // Reset data setelah produk berhasil ditambahkan
            setNewProduct({ name: '', description: '', price: '' });
            setNewImage(null);
            setShowAddModal(false); // Tutup modal Tambah Produk
        });
    };

    // Fungsi untuk menyimpan perubahan produk yang sedang diedit
    const handleSaveEditProduct = () => {
        // Panggil fungsi 'editProduct' dari hook 'useProducts'
        editProduct(editModal, editImage, () => {
            setShowEditModal(false); // Tutup modal Edit Produk setelah disimpan
        });
    };

    return (
        <>
            <div className="container mt-5 pb-5">
                <h2 className="mb-4 text-center">Kelola Produk</h2>
                {showAddModal && (
                    <>
                        <div className="modal-backdrop fade show"></div>
                        {/* Modal Tambah Produk */}
                        <div className="modal show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Tambah Produk</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" className="form-control mb-2" placeholder="Nama Produk" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                                        <textarea type="text" className="form-control mb-2" placeholder="Deskripsi" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                                        <input type="number" className="form-control mb-2" placeholder="Harga (RP)" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                                        <input type="file" className="form-control mb-2" onChange={(e) => setNewImage(e.target.files[0])} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Tutup</button>
                                        <button type="button" className="btn btn-primary" onClick={handleAddProduct}>Simpan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {showEditModal && (
                    <>
                        <div className="modal-backdrop fade show"></div>
                        {/* Modal Edit Produk */}
                        <div className="modal show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Produk</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" className="form-control mb-2" placeholder="Nama Produk" value={editModal.name} onChange={(e) => setEditModal({ ...editModal, name: e.target.value })} />
                                        <textarea type="text" className="form-control mb-2" placeholder="Deskripsi" value={editModal.description} onChange={(e) => setEditModal({ ...editModal, description: e.target.value })} />
                                        <input type="number" className="form-control mb-2" placeholder="Harga" value={editModal.price} onChange={(e) => setEditModal({ ...editModal, price: e.target.value })} />
                                        <input type="file" className="form-control mb-2" onChange={(e) => setEditImage(e.target.files[0])} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Tutup</button>
                                        <button type="button" className="btn btn-primary" onClick={handleSaveEditProduct}>Simpan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {/* Tombol untuk membuka modal Tambah Produk */}
                <button className="btn-tambah mb-4" onClick={() => setShowAddModal(true)}>Tambah Produk</button>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th width="10%">Gambar</th>
                                <th width="20%">Nama Produk</th>
                                <th width="50%">Deskripsi</th>
                                <th width="10%">Harga</th>
                                <th width="10%">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        {/* Tampilkan gambar produk */}
                                        <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>Rp {product.price}</td>
                                    <td>
                                        {/* Tombol untuk mengedit produk */}
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => {
                                            setEditModal(product); // Set produk yang sedang diedit
                                            setShowEditModal(true); // Buka modal Edit Produk
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M18.5 2.49996C18.8978 2.10213 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10213 21.5 2.49996C21.8978 2.8978 22.1213 3.43737 22.1213 3.99996C22.1213 4.56254 21.8978 5.10211 21.5 5.49996L12 14.99L9 15.99L10 12.99L18.5 2.49996Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteExistingProduct(product.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 6H5H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M10 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M14 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-warning me-2" onClick={handlePrevPage} disabled={currentPage === 1}>
                        Sebelumnya
                    </button>
                    <span className="align-self-center">Halaman {currentPage} dari {totalPages}</span>
                    <button className="btn btn-warning ms-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Selanjutnya
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ManageProducts;
