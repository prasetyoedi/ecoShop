import supabase from './SupabaseClient';

export const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select();
    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data;
};

export const addProduct = async (product) => {
    const { error } = await supabase.from('products').insert([product]);
    if (error) {
        console.error('Error adding product:', error);
        return false;
    }
    return true;
};

export const updateProduct = async (id, updatedProduct) => {
    const { error } = await supabase.from('products').update(updatedProduct).eq('id', id);
    if (error) {
        console.error('Error updating product:', error);
        return false;
    }
    return true;
};

export const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
        console.error('Error deleting product:', error);
        return false;
    }
    return true;
};

export const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file);

    if (error) {
        console.error('Error uploading image:', error);
        return null;
    }
    return `https://ikcdlekgngkazmvwttjy.supabase.co/storage/v1/object/public/images/${fileName}`;
};
