// "use client";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/context/AuthContext";
// import React, { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client"; // Ensure this path is correct
// import {
//   LayoutDashboard,
//   Calendar,
//   Users,
//   Ticket,
//   TrendingUp,
//   Edit,
//   Trash2,
//   Plus,
//   LogOut,
//   Loader2,
// } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";

// const [isModalOpen, setIsModalOpen] = useState(false);
// const [editingEvent, setEditingEvent] = useState<any>(null);
// const [formData, setFormData] = useState({
//   title: "",
//   date: "",
//   price: "",
//   venue: "",
//   image: "",
//   category: "",
//   shortDescription: "",
//   fullDescription: "",
// });

// const Admin = () => {
//   const { user, role, signOut, loading: authLoading } = useAuth();
//   const router = useRouter();

//   // State for dynamic data
//   const [dbEvents, setDbEvents] = useState<any[]>([]);
//   const [fetchingData, setFetchingData] = useState(true);

//   // 1. ROUTE PROTECTION
//   useEffect(() => {
//     if (!authLoading) {
//       if (
//         !user ||
//         (role !== "admin" && user.email !== "dumanbek17@gmail.com")
//       ) {
//         toast({
//           title: "Access Denied",
//           description: "You do not have permission to view the dashboard.",
//           variant: "destructive",
//         });
//         router.push("/signin");
//       }
//     }
//   }, [user, role, authLoading, router]);

//   // 2. FETCH REAL DATA FROM SUPABASE
//   const fetchSupabaseEvents = async () => {
//     setFetchingData(true);
//     const { data, error } = await supabase
//       .from("events" as any)
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       toast({
//         title: "Error fetching events",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       setDbEvents(data || []);
//     }
//     setFetchingData(false);
//   };

//   useEffect(() => {
//     if (user) fetchSupabaseEvents();
//   }, [user]);

//   // 3. DELETE ACTION
//   const handleDelete = async (id: string, title: string) => {
//     if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

//     const { error } = await supabase
//       .from("events" as any)
//       .delete()
//       .eq("id", id);

//     if (error) {
//       toast({
//         title: "Delete Failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       toast({
//         title: "Event Deleted",
//         description: `${title} has been removed.`,
//       });
//       // Update local state so it disappears instantly
//       setDbEvents((prev) => prev.filter((event) => event.id !== id));
//     }
//   };

//   const handleLogout = async () => {
//     await signOut();
//     router.push("/");
//   };

//   // 4. LOADING STATE
//   if (authLoading || (fetchingData && dbEvents.length === 0)) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center bg-background">
//         <Loader2 className="w-10 h-10 animate-spin text-primary" />
//       </div>
//     );
//   }

//   // Guard for unauthorized users
//   if (!user || (role !== "admin" && user.email !== "dumanbek17@gmail.com"))
//     return null;

//   const stats = [
//     {
//       label: "Total Events",
//       value: dbEvents.length, // Dynamic count
//       icon: Calendar,
//       color: "from-primary to-accent",
//     },
//     {
//       label: "Total Attendees",
//       value: "2,847",
//       icon: Users,
//       color: "from-secondary to-primary",
//     },
//     {
//       label: "Tickets Sold",
//       value: "1,234",
//       icon: Ticket,
//       color: "from-accent to-primary",
//     },
//     {
//       label: "Revenue",
//       value: "$45,890",
//       icon: TrendingUp,
//       color: "from-primary to-secondary",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="pt-24 pb-16">
//         <div className="container mx-auto px-4">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
//           >
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="p-2 rounded-lg bg-linear-to-br from-primary to-accent text-white">
//                   <LayoutDashboard className="w-6 h-6" />
//                 </div>
//                 <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
//                   Dashboard
//                 </h1>
//               </div>
//               <p className="text-muted-foreground">
//                 Welcome back,{" "}
//                 <span className="text-primary font-semibold">Duman</span>!
//               </p>
//             </div>

//             <Button variant="destructive" onClick={handleLogout}>
//               <LogOut className="w-4 h-4 mr-2" /> Logout
//             </Button>
//           </motion.div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 + index * 0.05 }}
//                 className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <div
//                     className={`p-3 rounded-xl bg-linear-to-br ${stat.color} text-white group-hover:scale-110 transition-transform`}
//                   >
//                     <stat.icon className="w-6 h-6" />
//                   </div>
//                 </div>
//                 <div className="font-display text-3xl font-bold text-foreground mb-1">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Events Management Table */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="rounded-2xl bg-card border border-border overflow-hidden"
//           >
//             <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <h2 className="font-display text-xl font-bold text-foreground">
//                 Event Management
//               </h2>
//               <Button
//                 onClick={() =>
//                   toast({
//                     title: "Next Step",
//                     description: "Open Add Event Modal",
//                   })
//                 }
//               >
//                 <Plus className="w-4 h-4 mr-2" /> Add New Event
//               </Button>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-muted/30">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-sm font-semibold">
//                       Event
//                     </th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold hidden md:table-cell">
//                       Date
//                     </th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold">
//                       Price
//                     </th>
//                     <th className="px-6 py-4 text-right text-sm font-semibold">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-border">
//                   {dbEvents.length > 0 ? (
//                     dbEvents.map((event) => (
//                       <tr
//                         key={event.id}
//                         className="hover:bg-muted/20 transition-colors"
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <img
//                               src={event.image}
//                               alt=""
//                               className="w-12 h-12 rounded-lg object-cover bg-muted"
//                             />
//                             <div>
//                               <div className="font-semibold">{event.title}</div>
//                               <div className="text-sm text-muted-foreground">
//                                 {event.venue}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
//                           {event.date}
//                         </td>
//                         <td className="px-6 py-4 font-semibold">
//                           ${event.price}
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center justify-end gap-2">
//                             <Button variant="ghost" size="icon">
//                               <Edit className="w-4 h-4" />
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="text-destructive hover:bg-destructive/10"
//                               onClick={() =>
//                                 handleDelete(event.id, event.title)
//                               }
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={4}
//                         className="px-6 py-10 text-center text-muted-foreground"
//                       >
//                         No events found in Supabase.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Admin;

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Ticket,
  TrendingUp,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Loader2,
  X,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Admin = () => {
  const { user, role, signOut, loading: authLoading } = useAuth();
  const router = useRouter();

  // State for data
  const [dbEvents, setDbEvents] = useState<any[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  // State for Modal (Add/Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    price: "",
    venue: "",
    image: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
  });

  // 1. ROUTE PROTECTION
  useEffect(() => {
    if (!authLoading) {
      if (
        !user ||
        (role !== "admin" && user.email !== "dumanbek17@gmail.com")
      ) {
        router.push("/signin");
      }
    }
  }, [user, role, authLoading, router]);

  // 2. FETCH DATA
  const fetchSupabaseEvents = async () => {
    setFetchingData(true);
    const { data, error } = await supabase
      .from("events" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setDbEvents(data || []);
    setFetchingData(false);
  };

  useEffect(() => {
    if (user) fetchSupabaseEvents();
  }, [user]);

  // 3. ADD / EDIT LOGIC (The "Upsert" logic)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.title.toLowerCase().replace(/ /g, "-");
    const payload = { ...formData, slug, price: Number(formData.price) };

    if (editingId) {
      // UPDATE existing
      const { error } = await supabase
        .from("events" as any)
        .update(payload)
        .eq("id", editingId);

      if (error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      else toast({ title: "Success", description: "Event updated!" });
    } else {
      // INSERT new
      const { error } = await supabase.from("events" as any).insert([payload]);

      if (error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      else toast({ title: "Success", description: "Event created!" });
    }

    setIsModalOpen(false);
    setEditingId(null);
    fetchSupabaseEvents();
  };

  // 4. DELETE LOGIC
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    const { error } = await supabase
      .from("events" as any)
      .delete()
      .eq("id", id);
    if (!error) {
      toast({ title: "Deleted" });
      setDbEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const openEditModal = (event: any) => {
    setEditingId(event.id);
    setFormData({
      title: event.title || "",
      date: event.date || "",
      price: event.price || "",
      venue: event.venue || "",
      image: event.image || "",
      category: event.category || "",
      shortDescription: event.shortDescription || "",
      fullDescription: event.fullDescription || "",
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      date: "",
      price: "",
      venue: "",
      image: "",
      category: "",
      shortDescription: "",
      fullDescription: "",
    });
    setIsModalOpen(true);
  };

  if (authLoading || (fetchingData && dbEvents.length === 0)) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* MODAL WINDOW */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-card border w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingId ? "Edit Event" : "Add New Event"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X />
                </Button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase">Title</label>
                  <input
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase">
                    Category
                  </label>
                  <input
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Music, Art..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase">Date</label>
                  <input
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="Dec 31, 2025"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase">Price</label>
                  <input
                    type="number"
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase">
                    Image URL
                  </label>
                  <input
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase">
                    Venue Name
                  </label>
                  <input
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2 pt-4 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingId ? "Update Event" : "Create Event"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <LayoutDashboard className="text-primary" /> Admin Dashboard
            </h1>
            <Button onClick={openAddModal} className="rounded-full px-6">
              <Plus className="w-4 h-4 mr-2" /> Add New Event
            </Button>
          </div>

          <div className="rounded-3xl border bg-card overflow-hidden shadow-xl">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="text-left text-sm uppercase text-muted-foreground">
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {dbEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-muted/20">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={event.image}
                        className="w-10 h-10 rounded-lg object-cover"
                        alt=""
                      />
                      <span className="font-bold">{event.title}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">{event.date}</td>
                    <td className="px-6 py-4 font-bold text-primary">
                      ${event.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(event)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDelete(event.id, event.title)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
