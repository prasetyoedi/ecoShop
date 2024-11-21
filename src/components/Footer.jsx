import React from 'react'

export default function Footer() {
    return (
        <>
            <div className='container footer'>
                <div className='row'>
                    <div className='col-md-6'>
                        <img src="/logo.png" alt="Logo Eco Shop" className='logo' />
                        <p className='mt-3'>
                            Eco Shop adalah tujuan tepercaya Anda untuk produk premium yang ramah lingkungan. Kami berkomitmen untuk memberikan pendekatan holistik terhadap kesehatan, memanfaatkan kekuatan alam untuk mendukung gaya hidup yang lebih sehat dan lebih berkelanjutan.
                        </p>
                        <div className='pb-5'>
                            <img src="/sosmed/fb.svg" alt="icon facebook" className='me-3' />
                            <img src="/sosmed/linkedin.svg" alt="icon linkedin" className='me-3' />
                            <img src="/sosmed/instagram.svg" alt="icon instagram" className='me-3' />
                            <img src="/sosmed/twitter.svg" alt="icon twitter" className='me-3' />
                            <img src="/sosmed/youtube.svg" alt="icon youtube" className='me-3' />
                        </div>
                    </div>
                    <div className='col-md-5 col-subsribe'>
                        <p className='fw-bold'>Terima penawaran & diskon melalui email</p>
                        <div className="input-group" style={{ maxWidth: '400px' }}>
                            <span className="input-group-text bg-white border-end-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c757d" viewBox="0 0 24 24">
                                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM4 6h16v.511l-8 4.8-8-4.8V6zm0 12V9.107l7.5 4.5a1 1 0 0 0 1 0L20 9.107V18H4z" />
                                </svg>
                            </span>
                            <input type="email" className="form-control border-start-0" placeholder="Enter Email" aria-label="Masukkan Email" />
                            <div className="btn-subsribe">Subscribe</div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className='container'>
                <p className='footer-text text-center'>© 2024, Eco Shop - All rights reserved.</p>
            </div>
        </>
    )
}
