import path from "path";

const config = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/app/components"),
      "@utils": path.resolve(__dirname, "src/app/utils"),
      "@routes": path.resolve(__dirname, "src/app/routes"),
      "@contexts": path.resolve(__dirname, "src/app/contexts"),
      "@app": path.resolve(__dirname, "src/app"),
      "@theme": path.resolve(__dirname, "src/theme"),
    },
  },
};

export default config;
