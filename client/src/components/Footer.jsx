import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 px-4 lg:px-44 py-3'>
          <Link to='/'> <img  className='w-32 sm:w-44' src={assets.RefineSnap_img} alt="" /></Link>
        <p className='flex-1 border-gray-200 pl-4 text-sm text-gray-500 max-sm:hidden'>All right reserved. Copyright @bg removal</p>
        <div className='flex gap-1'>
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
            <img width={40} src={assets.facebook_icon} alt="Facebook" />
          </a>
          <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
            <img width={40} src={assets.twitter_icon} alt="Twitter" />
          </a>
          <a href='https://plus.google.com' target='_blank' rel='noopener noreferrer'>
            <img width={40} src={assets.google_plus_icon} alt="Google Plus" />
          </a>
      </div>

    </div>
  )
}

export default Footer