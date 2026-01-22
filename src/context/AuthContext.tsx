// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import { User } from "@supabase/supabase-js";

// interface AuthContextType {
//   user: User | null;
//   role: string | null;
//   loading: boolean;
//   signOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchRole = async (userId: string) => {
//     const { data } = await supabase
//       .from("profiles")
//       .select("role")
//       .eq("id", userId)
//       .single();

//     if (data?.role) {
//       setRole(data.role.toLowerCase());
//     } else {
//       setRole("user");
//     }
//   };

//   useEffect(() => {
//     // 1. Get session immediately on mount
//     const initAuth = async () => {
//       try {
//         const {
//           data: { session },
//         } = await supabase.auth.getSession();
//         if (session?.user) {
//           setUser(session.user);
//           await fetchRole(session.user.id);
//         }
//       } catch (error) {
//         console.error("Auth init error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initAuth();

//     // 2. Listen for auth changes (login, logout, token refresh)
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       console.log("Auth Event:", event); // This will help us debug in the console

//       if (session?.user) {
//         setUser(session.user);
//         await fetchRole(session.user.id);
//       } else {
//         setUser(null);
//         setRole(null);
//       }
//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const signOut = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//     setRole(null);
//     window.location.href = "/"; // Force a hard redirect to clear all states
//   };

//   return (
//     <AuthContext.Provider value={{ user, role, loading, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined)
//     throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async (userId: string) => {
    try {
      // We add <any> here to tell TypeScript to stop complaining about the 'profiles' table
      const { data, error } = await supabase
        .from("profiles" as any)
        .select("role")
        .eq("id", userId)
        .single();

      if (data && "role" in data) {
        setRole((data as any).role.toLowerCase());
      } else {
        setRole("user");
      }
    } catch (err) {
      console.error("Error fetching role:", err);
      setRole("user");
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchRole(session.user.id);
      }
      setLoading(false);
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
