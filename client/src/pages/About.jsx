import React from 'react'
import './Home.css';
import './Global.css';
function About() {
  return (
    <div className='home-background'>
    <video autoPlay loop muted className='video-background'>
      <source src='homevideo.mp4' type='video/mp4' />
      Your browser does not support the video tag.
    </video>
    <div className='content-container'>
      <div className='content'>
        <h1 className='text-3xl font-bold mb-4 text-slate-900'>Welcome to Medi-Care</h1>
        <p className='mb-4 text-white font-semibold'>
          At Medicare, we are dedicated to connecting patients with top-notch healthcare services. Our platform allows patients to easily register and manage their accounts, providing seamless access to a network of trusted hospitals and experienced doctors. Whether you need routine check-ups or specialized treatments, Medicare is here to ensure you receive the best medical care available. Join us today and take a step towards better health and well-being.
        </p>
        <p className='mb-4 text-white font-semibold'>
          We understand that navigating the healthcare system can be overwhelming. That's why Medicare is designed to simplify the process, offering you a one-stop solution for all your medical needs. From booking appointments with top-rated specialists to accessing your medical records online, our platform is tailored to provide convenience and peace of mind. Our commitment to quality healthcare means you can trust us to support you every step of the way on your health journey.
        </p>
        <p className='mb-4 text-white font-semibold'>
          Medicare also offers personalized health recommendations and reminders to ensure you stay on top of your health. Our platform leverages advanced technology to provide secure and confidential access to your medical history, enabling doctors to deliver precise and effective care. With Medicare, you are not just a patient; you are part of a community dedicated to promoting wellness and improving healthcare outcomes for everyone. Join us today and experience a new era of healthcare services designed just for you.
        </p>
      </div>
    </div>
  </div>
  )
}

export default About
