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
    OTP,
    MovieDetail,
    NotFound,
} from "@/pages";
import { Guard } from "@/guards";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/details/:id" element={<MovieDetail />} />
                    <Route path="/series" element={<Series />} />
                    <Route path="/cartoons" element={<Cartoons />} />
                    <Route
                        path="/profile"
                        element={
                            <Guard requireAuth redirectTo="/signin">
                                <Profile />
                            </Guard>
                        }
                    />
                    <Route path="/search"></Route>
                </Route>
                <Route
                    path="/signup"
                    element={
                        <Guard requireAuth={false}>
                            <SignUp />
                        </Guard>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <Guard requireAuth={false}>
                            <SignIn />
                        </Guard>
                    }
                />
                <Route
                    path="/verification"
                    element={
                        <Guard requireAuth={false}>
                            <OTP />
                        </Guard>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
