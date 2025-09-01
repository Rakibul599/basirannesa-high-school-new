// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://basirannesahighschool.edu.bd',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  // manually add your App Router URLs
  additionalPaths: async (config) => [
    { loc: '/' },
    { loc: '/about' },
    { loc: '/achievements' },
    { loc: '/teacher' },
    { loc: '/student' },
    { loc: '/admin/login' },
  ],
};