"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BookOpen,
  CalendarCheck,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
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
    submenu: [
      {
        title: "All Lessons",
        href: "/admin/lessons",
      },
      {
        title: "Add New Lesson",
        href: "/admin/lessons/new",
      },
      {
        title: "Categories",
        href: "/admin/lessons/categories",
      },
    ],
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

export default function AdminSidebar() {
  const location = useLocation()
  const [openSubmenu, setOpenSubmenu] = useState(null)

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <div className="hidden md:flex md:w-64 md:flex-col h-screen bg-white border-r border-gray-200">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex items-center justify-center h-16 flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-primary">DriveRight Admin</h1>
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {sidebarLinks.map((item) => (
              <div key={item.title}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md",
                        location.pathname.startsWith(item.href)
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 flex-shrink-0 h-5 w-5",
                          location.pathname.startsWith(item.href)
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-500",
                        )}
                      />
                      <span className="flex-1">{item.title}</span>
                      {openSubmenu === item.title ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {openSubmenu === item.title && (
                      <div className="mt-1 space-y-1 pl-10">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.title}
                            to={subitem.href}
                            className={cn(
                              "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                              location.pathname === subitem.href
                                ? "text-primary font-semibold"
                                : "text-gray-600 hover:text-gray-900",
                            )}
                          >
                            {subitem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      location.pathname === item.href
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 flex-shrink-0 h-5 w-5",
                        location.pathname === item.href ? "text-white" : "text-gray-400 group-hover:text-gray-500",
                      )}
                    />
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <Button variant="outline" className="w-full justify-start text-gray-600 hover:text-gray-900">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

