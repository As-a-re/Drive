"use client"

import { motion } from "framer-motion"

export default function TestimonialCard({ name, role, image, quote }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full transform transition-all duration-300 hover:shadow-lg"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center mb-4">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-primary"
        />
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">"{quote}"</p>
    </motion.div>
  )
}

