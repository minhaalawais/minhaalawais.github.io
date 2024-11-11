/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'firebasestorage.googleapis.com', 'img.icons8.com', 'raw.githubusercontent.com', 'i.imgur.com', 'img.freepik.com','media.geeksforgeeks.org','ibb.co','i.ibb.co','miro.medium.com','www.iotworlds.com','www.fast2.tech','www.bloorresearch.com']
  }
}

module.exports = nextConfig
