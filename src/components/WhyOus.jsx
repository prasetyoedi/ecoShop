import React from 'react'

export default function WhyOus() {
    return (
        <>
            <div className='container-whyous'>
                <div className='container  why-ous pb-5'>
                    <h1 className='text-center mb-5 text-light'>Mengapa Memilih Kami?</h1>
                    <div className='row '>
                        <div className='card col-md-3 col-10 mx-auto'>
                            <div className="d-flex justify-content-center">
                                <img src="/whyous/1.png" alt="" />
                            </div>
                            <div className='title'>Produk Berkelanjutan</div>
                            <p>Jelajahi pilihan produk berkelanjutan kami yang dikurasi dengan cermat, masing-masing dirancang untuk mengurangi jejak karbon Anda</p>
                        </div>
                        <div className=' card col-md-3 col-10 mx-auto'>
                            <div className="d-flex justify-content-center">
                                <img src="/whyous/2.png" alt="" />
                            </div>
                            <div className='title'>Ramah Lingkungan</div>
                            <p>
                                Buatlah pilihan yang bijak dengan produk ramah lingkungan kami, dengan mengetahui bahwa setiap pembelian Anda mendukung sumber daya yang etis.
                            </p>
                        </div>
                        <div className='card col-md-3 col-10 mx-auto'>
                            <div className="d-flex justify-content-center">
                                <img src="/whyous/3.png" alt="" />
                            </div>
                            <div className='title'>Berkualitas Tinggi</div>
                            <p>Berinvestasilah pada produk yang tahan lama dan andal yang memenuhi standar kualitas ketat kami, memastikan kepuasan Anda serta umur panjang dari setiap pembelian.</p>
                        </div>
                        <div className='card col-md-3 col-10 mx-auto'>
                            <div className="d-flex justify-content-center">
                                <img src="/whyous/4.png" alt="" />
                            </div>
                            <div className='title'>Kemasan Berkelanjutan</div>
                            <p>Kemasan berkelanjutan kami memastikan bahwa pesanan Anda sampai dengan aman, sekaligus meminimalkan dampaknya terhadap planet ini.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
