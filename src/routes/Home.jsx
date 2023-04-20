import { NavLink } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi"
export const Home = () => {
    return (<>
        <div className="hero min-h-screen" style={{ backgroundImage: `url("nextdish_hero.jpg")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold font-['Croissant_One']">Welcome to NextDish</h1>
                    <p className="mb-5 text-lg font-['Inconsolata']">Where you can find new recipes and discover your next favorite dish.</p>
                    <NavLink to="/dishes">
                    <button className="btn btn-accent drop-shadow-xl text-2xl"><GiKnifeFork /></button>
                    </NavLink>
                </div>
            </div>
        </div>
    </>
    );
};