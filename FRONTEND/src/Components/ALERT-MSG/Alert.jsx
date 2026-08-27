import { Toaster } from "react-hot-toast";

const CustomAlert = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    background: "#0d1a22",
                    color: "#ffffff",
                    border: "1px solid #162c38",
                    fontSize: "13.5px",
                    fontWeight: "600",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)"
                },
                success: {
                    iconTheme: {
                        primary: "#10b981",
                        secondary: "#030708"
                    }
                },
                error: {
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#030708"
                    }
                }
            }}
        />
    );
};

export default CustomAlert;