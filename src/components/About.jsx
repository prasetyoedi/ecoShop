import React from 'react'

export default function About() {
    return (
        <>
            <div className='about'>
                <div className='container'>
                    <div className='title'>Tentang Kami</div>
                    <div className='row'>
                        <div className='col-md-1'></div>
                        <div className='col-md-10'>
                            <div className='d-flex justify-content-center'>
                                <img src="/logo.png" alt="Logo Eco Shop" className="logo mt-5 mb-5" />
                            </div>
                            <p>
                                Di Eco Shop, kami lebih dari sekadar platform e-commerce; kami adalah komunitas yang berkomitmen dan berfokus pada promosi gaya hidup berkelanjutan dan ramah lingkungan. Misi kami adalah mendukung konsumen yang peduli lingkungan dengan menyediakan berbagai produk premium dan berkelanjutan yang dikurasi dengan cermat yang mendorong perubahan yang berarti dan memberikan dampak positif bagi bumi kita ini.
                            </p>
                            <p className='fw-bold mt-5 mb-3 text-center'>
                                Visi Kami
                            </p>
                            <p>
                                “Menjadi platform terdepan untuk kehidupan berkelanjutan, menawarkan produk ramah lingkungan dan membina komunitas yang memperjuangkan konsumsi yang sadar dan pengelolaan lingkungan”
                            </p>
                            <p className='fw-bold mt-5 mb-3 text-center'>
                                Misi Kami
                            </p>
                            <p>
                                Untuk membangun masa depan yang berkelanjutan bagi generasi mendatang, di mana setiap keputusan diperhitungkan dan keberlanjutan membentuk kehidupan sehari-hari. Kami membayangkan dunia di mana kebiasaan ramah lingkungan menjadi standar, dan bersama-sama, kita dapat membuat perbedaan yang berarti bagi kesejahteraan bumi kita ini.
                            </p>
                        </div>
                        <div className='col-md-1'></div>
                    </div>
                </div>
            </div>
        </>
    )
}
