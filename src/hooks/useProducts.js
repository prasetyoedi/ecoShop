import { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct, uploadImage } from '../services/ProductService';
import Swal from 'sweetalert2';

const useProducts = () => {
    // State untuk menyimpan daftar produk
    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        loadProducts();
    }, []);

    // logik pagination
    // Hitung jumlah total halaman berdasarkan jumlah produk dan item per halaman
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Fungsi untuk menambah produk baru
    const addNewProduct = async (newProduct, newImage, onSuccess) => {
        if (!newProduct.name || !newProduct.description || !newProduct.price || !newImage) {
            Swal.fire('Error', 'Semua kolom harus diisi!', 'error');
            return;
        }

        // Unggah gambar produk dan dapatkan URL gambar
        const imageUrl = await uploadImage(newImage);
        if (!imageUrl) return;

        // Tambahkan produk baru ke server dengan data produk dan URL gambar
        const success = await addProduct({ ...newProduct, imageUrl });
        if (success) {
            const data = await fetchProducts();
            setProducts(data);
            onSuccess();
            Swal.fire('Berhasil!', 'Produk berhasil ditambahkan.', 'success');
        }
    };

    // Fungsi untuk mengedit produk yang ada
    const editProduct = async (editModal, editImage, onSuccess) => {
        // Gunakan URL gambar yang sudah ada jika tidak ada gambar baru yang diunggah
        let imageUrl = editModal.imageUrl;

        if (editImage) {
            // Jika ada gambar baru, unggah gambar dan dapatkan URL baru
            const uploadedImageUrl = await uploadImage(editImage);
            if (!uploadedImageUrl) return;
            imageUrl = uploadedImageUrl;
        }

        // Kirim data produk yang sudah diedit ke server
        const success = await updateProduct(editModal.id, { ...editModal, imageUrl });
        if (success) {
            const data = await fetchProducts();
            setProducts(data);
            onSuccess();
            Swal.fire('Berhasil!', 'Produk berhasil diperbarui.', 'success');
        }
    };

    const deleteExistingProduct = async (id) => {
        const result = await Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Produk yang dihapus tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        });

        // Jika pengguna mengkonfirmasi penghapusan
        if (result.isConfirmed) {
            const success = await deleteProduct(id);
            if (success) {
                const data = await fetchProducts();
                setProducts(data);
                Swal.fire('Berhasil!', 'Produk berhasil dihapus.', 'success');
            } else {
                Swal.fire('Error!', 'Gagal menghapus produk.', 'error');
            }
        }
    };

    // Return nilai-nilai yang dibutuhkan untuk dikelola dan digunakan di komponen lain
    return {
        products,
        currentProducts,
        currentPage,
        totalPages,
        handleNextPage,
        handlePrevPage,
        addNewProduct,
        editProduct,
        deleteExistingProduct,
    };
};

export default useProducts;
