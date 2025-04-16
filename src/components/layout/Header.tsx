import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

interface MenuItemProps {
  to: string;
  offset: number;
  children: ReactNode;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItem = ({ to, offset, children, setMenuOpen }: MenuItemProps) => {
  const underlineVariants = {
    initial: { width: 0 },
    hover: { width: "100%" },
  };

  return (
    <motion.div className="relative cursor-pointer" initial="initial" whileHover="hover">
      <Link to={to} smooth offset={offset} duration={500} className="relative" onClick={() => setMenuOpen(false)}>
        {children}
      </Link>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#FF5627]"
        variants={underlineVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const offCanvasVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  const headerVariants = {
    initial: { y: 0, boxShadow: "none" },
    scrolled: {
      y: ["-100%", "0%"],
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={headerVariants}
      initial="initial"
      animate={hasScrolled ? "scrolled" : "initial"}
      className={`${hasScrolled ? "sticky" : "relative"} top-0 w-full bg-[#F0F0F0] z-30`}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-5">
        <Link to="hero" smooth offset={-100} duration={500} className="relative" onClick={() => setMenuOpen(false)}>
          <img src="/logo2.png" alt="logo header" className="w-60 cursor-pointer" />
        </Link>
        <button className="md:hidden text-black focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {!menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
        <ul className="hidden md:flex items-center text-[#002452] text-lg lg:text-xl font-[poppins] gap-6">
          <MenuItem to="vantagens" offset={-300} setMenuOpen={setMenuOpen}>Vantagens</MenuItem>
          <MenuItem to="steps" offset={-100} setMenuOpen={setMenuOpen}>Como utilizar</MenuItem>
          <MenuItem to="faq" offset={-100} setMenuOpen={setMenuOpen}>Dúvidas</MenuItem>
          <MenuItem to="contact" offset={-100} setMenuOpen={setMenuOpen}>Contatos</MenuItem>
        </ul>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-40">
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute top-0 right-0 w-3/4 h-full bg-[#F0F0F0]"
              variants={offCanvasVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
            >
              <button className="absolute top-4 right-4 text-2xl cursor-pointer focus:outline-none" onClick={() => setMenuOpen(false)}>
                X
              </button>
              <div className="flex flex-col items-center text-[#002452] text-xl font-[poppins] gap-6 py-16">
                <MenuItem to="vantagens" offset={-300} setMenuOpen={setMenuOpen}>Vantagens</MenuItem>
                <MenuItem to="steps" offset={-100} setMenuOpen={setMenuOpen}>Como utilizar</MenuItem>
                <MenuItem to="faq" offset={-100} setMenuOpen={setMenuOpen}>Dúvidas</MenuItem>
                <MenuItem to="contact" offset={-100} setMenuOpen={setMenuOpen}>Contatos</MenuItem>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
