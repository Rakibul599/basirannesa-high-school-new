import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
       
    unoptimized: true,
 
    domains: ['res.cloudinary.com', "img.daisyui.com", "localhost","basirannesahighschool.edu.bd",],
    remotePatterns: [],
  },
};
// const nextConfig: NextConfig = {
//   output: 'export',
//   images: {
//     domains: ['res.cloudinary.com',"img.daisyui.com","localhost"],
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "api.basirannesahighschool.edu.bd",
//         port: "30000",
//         pathname: "/uploads/avatars/**",
//       },
//     ],
//   },
// };

export default nextConfig;
