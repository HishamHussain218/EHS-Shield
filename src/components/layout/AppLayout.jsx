import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#F4F7F9] font-sans" dir="rtl">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <motion.main
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 p-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
