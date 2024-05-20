/// <reference types="vite/client" />
declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_BASE_URL: string;
        // Add other environment variables here if needed
    }
}