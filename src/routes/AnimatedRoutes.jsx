import { Routes, Route, useLocation } from 'react-router-dom';

//  Routes (pages) 
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Dishes } from './pages/Dishes';
import { DishesCategories } from './pages/DishesCategories';
import { DishDetail } from './pages/DishDetail';
import { Favorites } from './pages/Favorites';
import { About } from './pages/About';
import { SignUp } from "./pages/SignUp";
import { Search } from './pages/Search';

export const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.key}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/dishes/:category" element={<DishesCategories />} />
            <Route path="/dishes/:category/:id" element={<DishDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}