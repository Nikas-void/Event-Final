// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Sparkles, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/context/AuthContext";

// const navLinks = [
//   { path: "/", label: "Home", key: "home" },
//   { path: "/events", label: "Events", key: "events" },
//   { path: "/music", label: "Music", key: "music" },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const { user, role, signOut, loading } = useAuth();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const activeLinkKey =
//     navLinks.find((link) => link.path === pathname)?.key ?? "";

//   // Debugging log - view this in your Browser Console (F12)
//   console.log("Navbar Auth Check:", { email: user?.email, role: role });

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="fixed top-0 left-0 right-0 z-50 nav-glass shadow-lg"
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2 group">
//             <Sparkles className="w-6 h-6 text-primary group-hover:animate-pulse" />
//             <span className="font-display text-xl font-bold text-gradient-primary">
//               EventHub
//             </span>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 href={link.path}
//                 className="relative font-medium text-gradient-primary"
//               >
//                 {link.label}
//                 {activeLinkKey === link.key && (
//                   <motion.div
//                     layoutId="underline"
//                     className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full"
//                   />
//                 )}
//               </Link>
//             ))}
//           </div>

//           {/* Auth Section */}
//           <div className="hidden md:flex items-center gap-4">
//             {loading ? (
//               <div className="h-8 w-20 bg-muted/20 animate-pulse rounded-md" />
//             ) : user ? (
//               <>
//                 {/* THE FIX: Check role OR force check your email.
//                    This ensures that even if the DB is slow, you get your button.
//                 */}
//                 {(role === "admin" ||
//                   user.email === "dumanbek17@gmail.com") && (
//                   <Link href="/dashboard">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="text-primary hover:bg-primary/10 border border-primary/20"
//                     >
//                       <LayoutDashboard className="w-4 h-4 mr-2" />
//                       Dashboard
//                     </Button>
//                   </Link>
//                 )}

//                 <Button variant="outline" size="sm" onClick={() => signOut()}>
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <Link href="/signin">
//                 <Button size="sm">Sign In</Button>
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-border flex flex-col gap-4 bg-background">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 href={link.path}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="px-4 py-2 font-medium"
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <div className="px-4 pt-2 border-t border-border flex flex-col gap-2">
//               {user &&
//                 (role === "admin" || user.email === "dumanbek17@gmail.com") && (
//                   <Link
//                     href="/dashboard"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <Button
//                       variant="ghost"
//                       className="w-full justify-start text-primary"
//                     >
//                       Dashboard
//                     </Button>
//                   </Link>
//                 )}
//               {user ? (
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start"
//                   onClick={() => {
//                     signOut();
//                     setMobileMenuOpen(false);
//                   }}
//                 >
//                   Logout
//                 </Button>
//               ) : (
//                 <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
//                   <Button className="w-full">Sign In</Button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </motion.nav>
//   );
// }

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { path: "/", label: "Home", key: "home" },
  { path: "/events", label: "Events", key: "events" },
  { path: "/music", label: "Music", key: "music" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, signOut, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = role === "admin" || user?.email === "dumanbek17@gmail.com";
  const activeLinkKey =
    navLinks.find((link) => link.path === pathname)?.key ?? "";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 nav-glass shadow-lg bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-primary group-hover:animate-pulse" />
            <span className="font-display text-xl font-bold text-gradient-primary">
              EventHub
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="relative font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
                {activeLinkKey === link.key && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Section & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {!loading && user ? (
                <>
                  {isAdmin && (
                    <Link href="/dashboard">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary border border-primary/20"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="sm" onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                !loading && (
                  <Link href="/signin">
                    <Button size="sm">Sign In</Button>
                  </Link>
                )
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-border flex flex-col gap-2 overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium ${
                    pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <hr className="border-border my-2" />

              <div className="px-4 flex flex-col gap-3">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-primary p-0"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Sign In</Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
