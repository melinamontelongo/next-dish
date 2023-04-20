//  Components
import { Navbar } from './components/Navbar';
import { AnimatedRoutes } from './routes/AnimatedRoutes';
import { LocationProvider } from './routes/LocationProvider';

export const App = () => {
    return (
        <>
            <Navbar />
            <LocationProvider>
                <AnimatedRoutes />
            </LocationProvider>
        </>
    )
}