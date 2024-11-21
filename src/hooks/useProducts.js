import { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct, uploadImage } from '../services/ProductService';
import Swal from 'sweetalert2';

// Custom hook 'useProducts' untuk mengelola produk
const useProducts = () => {
    // State untuk menyimpan daftar produk
    const [products, setProducts] = useState([]);
    // State untuk halaman produk yang sedang aktif / pagination
    const [currentPage, setCurrentPage] = useState(1);
    // Konstanta untuk jumlah item per halaman (di sini diatur 2 item per halaman)
    const itemsPerPage = 2;

    // useEffect dijalankan saat komponen pertama kali di-render
    useEffect(() => {
        // Fungsi asinkron untuk mengambil data produk
        const loadProducts = async () => {
            // Ambil data produk dari API
            const data = await fetchProducts();
            // Simpan data produk yang diambil ke dalam state 'products'
            setProducts(data);
        };
        // Panggil fungsi loadProducts untuk memuat data saat komponen diinisialisasi
        loadProducts();
    }, []);

    // logik pagination
    // Hitung jumlah total halaman berdasarkan jumlah produk dan item per halaman
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Tentukan produk yang akan ditampilkan pada halaman saat ini
    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,  // Indeks awal produk untuk halaman saat ini
        currentPage * itemsPerPage          // Indeks akhir produk untuk halaman saat ini
    );

    // Fungsi untuk berpindah ke halaman berikutnya
    const handleNextPage = () => {
        // Periksa apakah halaman saat ini belum mencapai halaman terakhir
        if (currentPage < totalPages) {
            // Jika belum, tambahkan nilai currentPage
            setCurrentPage(currentPage + 1);
        }
    };

    // Fungsi untuk berpindah ke halaman sebelumnya
    const handlePrevPage = () => {
        // Periksa apakah halaman saat ini bukan halaman pertama
        if (currentPage > 1) {
            // Jika bukan, kurangi nilai currentPage
            setCurrentPage(currentPage - 1);
        }
    };

    // Fungsi untuk menambah produk baru
    const addNewProduct = async (newProduct, newImage, onSuccess) => {
        // Periksa apakah semua kolom wajib diisi
        if (!newProduct.name || !newProduct.description || !newProduct.price || !newImage) {
            // Tampilkan pesan kesalahan jika ada kolom yang kosong
            Swal.fire('Error', 'Semua kolom harus diisi!', 'error');
            return;
        }

        // Unggah gambar produk dan dapatkan URL gambar
        const imageUrl = await uploadImage(newImage);
        if (!imageUrl) return; // Jika gagal mengunggah, hentikan proses

        // Tambahkan produk baru ke server dengan data produk dan URL gambar
        const success = await addProduct({ ...newProduct, imageUrl });
        if (success) {
            // Jika berhasil, ambil kembali daftar produk terbaru
            const data = await fetchProducts();
            setProducts(data);
            // Panggil fungsi onSuccess jika ada
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
            if (!uploadedImageUrl) return; // Jika gagal mengunggah, hentikan proses
            imageUrl = uploadedImageUrl;  // Gunakan URL gambar yang baru diunggah
        }

        // Kirim data produk yang sudah diedit ke server
        const success = await updateProduct(editModal.id, { ...editModal, imageUrl });
        if (success) {
            // Jika berhasil, ambil kembali daftar produk terbaru
            const data = await fetchProducts();
            setProducts(data);
            // Panggil fungsi onSuccess jika ada
            onSuccess();
            // Tampilkan pesan sukses menggunakan Swal
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
            // Hapus produk berdasarkan ID
            const success = await deleteProduct(id);
            if (success) {
                // Jika berhasil, ambil kembali daftar produk terbaru
                const data = await fetchProducts();
                setProducts(data);
                // Tampilkan pesan sukses menggunakan Swal
                Swal.fire('Berhasil!', 'Produk berhasil dihapus.', 'success');
            } else {
                // Jika gagal, tampilkan pesan error
                Swal.fire('Error!', 'Gagal menghapus produk.', 'error');
            }
        }
    };

    // Return nilai-nilai yang dibutuhkan untuk dikelola dan digunakan di komponen lain
    return {
        products,            // Daftar lengkap produk
        currentProducts,     // Produk yang akan ditampilkan pada halaman saat ini
        currentPage,         // Halaman yang sedang aktif
        totalPages,          // Jumlah total halaman
        handleNextPage,      // Fungsi untuk berpindah ke halaman berikutnya
        handlePrevPage,      // Fungsi untuk berpindah ke halaman sebelumnya
        addNewProduct,       // Fungsi untuk menambah produk baru
        editProduct,         // Fungsi untuk mengedit produk yang ada
        deleteExistingProduct, // Fungsi untuk menghapus produk yang ada
    };
};

export default useProducts;
