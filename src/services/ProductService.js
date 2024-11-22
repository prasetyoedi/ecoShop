import supabase from './SupabaseClient';

// Mengambil semua data produk dari tabel 'products' menggunakan Supabase
export const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select();
    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data;
};

// Menambahkan produk baru ke tabel 'products' menggunakan Supabase
export const addProduct = async (product) => {
    const { error } = await supabase.from('products').insert([product]);
    if (error) {
        console.error('Error adding product:', error);
        return false;
    }
    return true;
};

// Memperbarui data produk di tabel 'products' berdasarkan ID
export const updateProduct = async (id, updatedProduct) => {
    const { error } = await supabase.from('products').update(updatedProduct).eq('id', id);
    if (error) {
        console.error('Error updating product:', error);
        return false;
    }
    return true;
};

// Menghapus produk dari tabel 'products' berdasarkan ID
export const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
        console.error('Error deleting product:', error);
        return false;
    }
    return true;
};

// Mengunggah file gambar ke penyimpanan Supabase
export const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file);

    if (error) {
        console.error('Error uploading image:', error);
        return null;
    }
    // Mengembalikan URL file yang bisa diakses secara publik
    return `https://ikcdlekgngkazmvwttjy.supabase.co/storage/v1/object/public/images/${fileName}`;
};
