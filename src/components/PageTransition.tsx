
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
