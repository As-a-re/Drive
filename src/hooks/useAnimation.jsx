"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

export const useAnimation = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return {
    ref,
    inView,
    fadeIn: {
      initial: { opacity: 0 },
      animate: inView ? { opacity: 1 } : { opacity: 0 },
      transition: { duration: 0.6 },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
      transition: { duration: 0.6 },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
      transition: { duration: 0.6 },
    },
    fadeInRight: {
      initial: { opacity: 0, x: 30 },
      animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 },
      transition: { duration: 0.6 },
    },
    staggerContainer: {
      initial: {},
      animate: { transition: { staggerChildren: 0.1 } },
    },
    staggerItem: {
      initial: { opacity: 0, y: 20 },
      animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
      transition: { duration: 0.3 },
    },
    AnimatedElement: ({ children, animation = "fadeIn", className = "", ...props }) => {
      const animations = {
        fadeIn: {
          initial: { opacity: 0 },
          animate: inView ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.6 },
        },
        fadeInUp: {
          initial: { opacity: 0, y: 30 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
          transition: { duration: 0.6 },
        },
        fadeInLeft: {
          initial: { opacity: 0, x: -30 },
          animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
          transition: { duration: 0.6 },
        },
        fadeInRight: {
          initial: { opacity: 0, x: 30 },
          animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 },
          transition: { duration: 0.6 },
        },
      }

      return (
        <motion.div ref={ref} className={className} {...animations[animation]} {...props}>
          {children}
        </motion.div>
      )
    },
  }
}

