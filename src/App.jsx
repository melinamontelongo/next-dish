import { Routes, Route } from 'react-router-dom';

//  Routes (pages) 
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { Profile } from './routes/Profile';
import { Dishes } from './routes/Dishes';
import { DishesCategories } from './routes/DishesCategories';
import { DishDetail } from './routes/DishDetail';
import { Favorites } from './routes/Favorites';
import { About } from './routes/About';
import { SignUp } from "./routes/SignUp";
import { Search } from './routes/Search';

//  Components
import { Navbar } from './components/Navbar';

export const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
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
        </>
    )
}