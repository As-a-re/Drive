"use client"

import { motion } from "framer-motion"

export default function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
      whileHover={{ scale: 1.03 }}
    >
      <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-secondary/20 text-primary rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

