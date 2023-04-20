import { motion, AnimatePresence } from "framer-motion";
import { routeVariants } from "../utils/animationVariants";

export const Container = (props) => {
    return(
        <motion.div variants={routeVariants}  initial="hidden" animate="visible" className="min-h-screen pt-32 px-10 pb-10 bg-neutral/25 bg-gradient-to-r from-secondary/75">
            {props.children}
        </motion.div>
    );
};