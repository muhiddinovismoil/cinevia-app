import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layout";
import * as pages from "@/pages";
import { Guard } from "@/guards";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<pages.Home />} />
                    <Route path="/movies" element={<pages.Movies />} />
                    <Route
                        path="/details/:id"
                        element={<pages.MovieDetail />}
                    />
                    <Route path="/series" element={<pages.Series />} />
                    <Route path="/cartoons" element={<pages.Cartoons />} />
                    <Route
                        path="/profile"
                        element={
                            <Guard requireAuth redirectTo="/signin">
                                <pages.Profile />
                            </Guard>
                        }
                    />
                    <Route
                        path="/favourites"
                        element={
                            <Guard requireAuth redirectTo="/signin">
                                <pages.Favourite />
                            </Guard>
                        }
                    />
                    <Route
                        path="/watchhistories"
                        element={
                            <Guard requireAuth redirectTo="/signin">
                                <pages.WatchHistory />
                            </Guard>
                        }
                    />
                    <Route element={<pages.SearchPage />} path="/search" />
                </Route>
                <Route
                    path="/signup"
                    element={
                        <Guard requireAuth={false}>
                            <pages.SignUp />
                        </Guard>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <Guard requireAuth={false}>
                            <pages.SignIn />
                        </Guard>
                    }
                />
                <Route
                    path="/verification"
                    element={
                        <Guard requireAuth={false}>
                            <pages.OTP />
                        </Guard>
                    }
                />
                <Route path="*" element={<pages.NotFound />} />
            </Routes>
        </>
    );
}

export default App;
