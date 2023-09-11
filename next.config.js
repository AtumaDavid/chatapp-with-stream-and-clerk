/** @type {import('next').NextConfig} */
const nextConfig = {
  //for this error in console "./node_modules/ws/lib/buffer-util.js =>
  // "Module not found: Can't resolve 'bufferutil' in 'C:\Users\atuma\OneDrive\Desktop\Next\my-chat-app\node_modules\ws\lib'"
  //   add webpack...
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
};

module.exports = nextConfig;
