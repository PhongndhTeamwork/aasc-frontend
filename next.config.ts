import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    experimental : {
        serverActions : {
            allowedOrigins: ["https://dinhphong.bitrix24.vn"],
        }
    }
};

export default nextConfig;
