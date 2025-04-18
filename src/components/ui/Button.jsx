"use client"

import { forwardRef } from "react"
import { cn } from "../../lib/utils"
import { cva } from "class-variance-authority"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        gradient: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-600 hover:to-secondary-600",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const Button = forwardRef(({ className, variant, size, asChild = false, animate = true, ...props }, ref) => {
  const ButtonComponent = animate ? motion.button : "button"

  const animationProps = animate
    ? {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2 },
      }
    : {}

  return (
    <ButtonComponent
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...animationProps}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }

