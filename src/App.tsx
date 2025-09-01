import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layout";
import {
    Home,
    Movies,
    Profile,
    Series,
    Cartoons,
    SignUp,
    SignIn,
} from "@/pages";
import { OTP } from "./pages/auth/otp/page";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/series" element={<Series />} />
                    <Route path="/cartoons" element={<Cartoons />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/verification" element={<OTP />} />
            </Routes>
        </>
    );
}

export default App;
