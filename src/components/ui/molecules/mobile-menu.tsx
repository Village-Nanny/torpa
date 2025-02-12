import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '../atoms/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { signOut } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { toast } from 'sonner';

export function MobileMenu({ brand = 'Torpa' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully logged out!');
      setMenuOpen(false);
    } catch {
      toast.error('Failed to log out. Please try again.');
    }
  };

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
                  {user ? (
                    <>
                      <motion.div variants={itemVariants}>
                        <Button
                          asChild
                          className="w-full bg-green-500 hover:bg-green-600 text-white border-green-400 hover:border-green-300 transition-all duration-200 font-bold"
                          onClick={() => setMenuOpen(false)}>
                          <Link href="/dashboard">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center justify-center w-full gap-2">
                              <LayoutDashboard className="w-4 h-4" />
                              Dashboard
                            </motion.span>
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <Button
                          className="w-full border-green-500 hover:border-green-400 text-white hover:text-white hover:bg-green-500 bg-transparent transition-all duration-200 font-medium"
                          variant="outline"
                          onClick={handleSignOut}>
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center w-full gap-2">
                            <LogOut className="w-4 h-4" />
                            Sign out
                          </motion.span>
                        </Button>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div variants={itemVariants}>
                      <Button
                        asChild
                        className="w-full bg-green-500 hover:bg-green-600 text-white border-green-400 hover:border-green-300 transition-all duration-200 font-bold"
                        onClick={() => setMenuOpen(false)}>
                        <Link href="/login">
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center w-full">
                            Log In
                          </motion.span>
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
