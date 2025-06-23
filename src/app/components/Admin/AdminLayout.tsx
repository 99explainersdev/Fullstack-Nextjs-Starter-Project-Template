"use client";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCalendarCheck,
  FaUserClock,
  FaTasks,
  FaListAlt,
  FaWarehouse,
  FaUserCircle,
  FaArchive,

  FaChevronRight,
  FaPlus,
  FaClipboardList
} from "react-icons/fa";
import { UserX } from "lucide-react"; 

function AdminLayout({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-expand task menu if on task-related page
  useEffect(() => {
    if (pathname.startsWith("/superadmin/task-management")) {
      setIsTaskMenuOpen(true);
    }
  }, [pathname]);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const toggleTaskMenu = () => setIsTaskMenuOpen((prev) => !prev);

  const navItems = [
    {
      name: "Dashboard",
      href: "/superadmin",
      icon: <FaTachometerAlt className="w-5 h-5" />,
    },
    {
      name: "Task Management",
      icon: <FaTasks className="w-5 h-5" />,
      hasSubMenu: true,
      subItems: [
        {
          name: "Assign Task",
          href: "/superadmin/assign-task",
          icon: <FaPlus className="w-4 h-4" />,
        },
        {
          name: "Task List",
          href: "/superadmin/task-list",
          icon: <FaClipboardList className="w-4 h-4" />,
        },
      ],
    },
    {
      name: "Attendance",
      href: "/superadmin/attendance",
      icon: <FaUserClock className="w-5 h-5" />,
    },
    {
      name: "Absent Employees",
      href: "/superadmin/absent",
      icon: <UserX className="w-5 h-5" />,
    },
    {
      name: "Leave Management",
      href: "/superadmin/leave-request",
      icon: <FaCalendarCheck className="w-5 h-5" />,
    },
    {
      name: "Employee Directory",
      href: "/superadmin/employee-list",
      icon: <FaListAlt className="w-5 h-5" />,
    },
    {
      name: "Hardware Inventory",
      href: "/superadmin/hardware-inventory",
      icon: <FaWarehouse className="w-5 h-5" />,
    },
    {
      name: "Archive",
      href: "/superadmin/archive",
      icon: <FaArchive className="w-5 h-5" />,
    },
    {
      name: "Profile Settings",
      href: "/superadmin/profile",
      icon: <FaUserCircle className="w-5 h-5" />,
    },
  ];

  // Check if a nav item is active
  const isActive = (href: string) => {
    return pathname === href || 
           (href !== "/superadmin" && pathname.startsWith(href));
  };

  // Check if task management section is active
  const isTaskSectionActive = () => {
    return pathname.startsWith("/superadmin/task-management");
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm"
          onClick={toggleDrawer}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-50 h-full w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${
            isMobile
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
        `}
      >
        {/* Logo/Brand Section */}
        <div className="flex items-center justify-between px-6 py-8">
          <Link href="/superadmin" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Admin
            </h2>
          </Link>
          {isMobile && (
            <button 
              onClick={toggleDrawer} 
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.hasSubMenu ? (
                  // Task Management with Sub-menu
                  <>
                    <button
                      onClick={toggleTaskMenu}
                      className={`
                        flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg
                        transition-all duration-200 group
                        ${
                          isTaskSectionActive()
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`
                          ${isTaskSectionActive() ? "text-gray-700" : "text-gray-500 group-hover:text-gray-700"}
                        `}>
                          {item.icon}
                        </div>
                        <span>{item.name}</span>
                      </div>
                      <div className={`
                        text-gray-400 group-hover:text-gray-600 transition-all duration-200
                        ${isTaskMenuOpen ? "rotate-90" : ""}
                      `}>
                        <FaChevronRight className="w-3 h-3" />
                      </div>
                    </button>
                    
                    {/* Sub-menu */}
                    {isTaskMenuOpen && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.subItems?.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              onClick={isMobile ? toggleDrawer : undefined}
                              className={`
                                flex items-center space-x-3 px-3 py-2 text-sm rounded-lg
                                transition-all duration-200 group
                                ${
                                  isActive(subItem.href)
                                    ? "bg-gray-100 text-gray-900 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }
                              `}
                            >
                              <div className={`
                                ${isActive(subItem.href) ? "text-gray-700" : "text-gray-400 group-hover:text-gray-600"}
                              `}>
                                {subItem.icon}
                              </div>
                              <span>{subItem.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  // Regular navigation items
                  <Link
                    href={item.href!}
                    onClick={isMobile ? toggleDrawer : undefined}
                    className={`
                      flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg
                      transition-all duration-200 group
                      ${
                        isActive(item.href!)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <div className={`
                      ${isActive(item.href!) ? "text-gray-700" : "text-gray-500 group-hover:text-gray-700"}
                    `}>
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Upgrade Section */}
     

          {/* Bottom Links */}
          <div className="border-t border-gray-200 pt-4 pb-6 mx-3 mt-6">
            <div className="space-y-1">
              <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors group">
                <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center group-hover:border-gray-600">
                  <span className="text-xs">?</span>
                </div>
                <span>Help & Information</span>
              </button>
              <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors group">
                <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center group-hover:border-gray-600">
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-600"></div>
                </div>
                <span>Log out</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  onClick={toggleDrawer}
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-lg transition-colors"
                  aria-label="Open sidebar"
                >
                  <FaBars className="w-5 h-5" />
                </button>
              )}
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-slate-900">
                  Welcome back, Administrator
                </h1>
                <p className="text-slate-600 text-sm mt-1">
                  Manage your organization efficiently
                </p>
              </div>
            </div>
            
            {/* Header actions could go here */}
            <div className="flex items-center space-x-3">
              {/* Add header actions like notifications, user menu, etc. */}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;