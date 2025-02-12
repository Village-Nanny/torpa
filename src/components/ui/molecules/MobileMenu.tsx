import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '../atoms/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  brand?: string;
}

export function MobileMenu({ navLinks, brand = 'Torpa' }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        when: 'afterChildren',
        staggerChildren: 0.05,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
      <motion.div
        className="bg-green-600/95 backdrop-blur-sm shadow-lg"
        initial={false}
        animate={{
          height: menuOpen ? 'auto' : '64px',
          transition: { duration: 0.3 },
        }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-white font-extrabold text-2xl">
                {brand}
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg text-white hover:bg-green-500/50 transition-colors">
              <motion.div animate={{ rotate: menuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav initial="closed" animate="open" exit="closed" variants={menuVariants} className="mt-4">
                <div className="space-y-1">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ x: 10 }}
                      className="rounded-lg overflow-hidden">
                      <Link
                        href={link.href}
                        className="block text-white text-lg font-bold py-3 px-4 hover:bg-green-500/50 transition-colors rounded-lg"
                        onClick={() => setMenuOpen(false)}>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={itemVariants} className="pt-2">
                    <Button
                      asChild
                      className="w-full bg-white text-gray-900 shadow-lg hover:shadow-xl transition-shadow"
                      variant="default"
                      onClick={() => setMenuOpen(false)}>
                      <Link href="/login">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center w-full font-bold">
                          Log In
                        </motion.span>
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
