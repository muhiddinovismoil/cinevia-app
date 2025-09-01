import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "@/config";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={client}>
        <BrowserRouter>
            <App />
            <Toaster
                position="top-right"
                toastOptions={{
                    error: {
                        style: {
                            border: "1px solid #bf1d1d",
                            backgroundColor: "#1f2937",
                            color: "#bf1d1d",
                        },
                    },
                    success: {
                        style: {
                            border: "1px solid #828282",
                            backgroundColor: "#1f2937",
                            color: "white",
                        },
                    },
                }}
            />
        </BrowserRouter>
    </QueryClientProvider>
);
