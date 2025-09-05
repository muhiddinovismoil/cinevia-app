import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { client, toastOptions } from "@/config";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "@/components";

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={client}>
        <BrowserRouter>
            <ScrollToTop />
            <App />
            <Toaster position="top-right" toastOptions={toastOptions} />
        </BrowserRouter>
    </QueryClientProvider>
);
