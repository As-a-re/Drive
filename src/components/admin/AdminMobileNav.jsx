"use client"

import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, CreditCard, BookOpen, CalendarCheck, Settings, LogOut, X } from "lucide-react"
import { Button } from "../ui/Button"
import { cn } from "../../lib/utils"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: Users,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Lessons",
    href: "/admin/lessons",
    icon: BookOpen,
  },
  {
    title: "Enrollments",
    href: "/admin/enrollments",
    icon: CalendarCheck,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminMobileNav({ onClose }) {
  const location = useLocation()

  return (
    <div className="fixed inset-0 flex z-40 md:hidden">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <Button
            variant="ghost"
            size="icon"
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6 text-white" />
          </Button>
        </div>
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4">
            <h1 className="text-xl font-bold text-primary">DriveRight Admin</h1>
          </div>
          <nav className="mt-5 px-2 space-y-1">
            {sidebarLinks.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                  location.pathname === item.href
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
                onClick={onClose}
              >
                <item.icon
                  className={cn(
                    "mr-4 flex-shrink-0 h-6 w-6",
                    location.pathname === item.href ? "text-white" : "text-gray-400 group-hover:text-gray-500",
                  )}
                />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <Button variant="outline" className="w-full justify-start text-gray-600 hover:text-gray-900">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
      <div className="flex-shrink-0 w-14"></div>
    </div>
  )
}

