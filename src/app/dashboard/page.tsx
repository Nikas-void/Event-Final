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
  X,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Loading from "../loading";

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
    slug: "",
    date: "",
    price: "",
    venue: "",
    image: "",
    time: "",
    location: "",
    featured: false,
    category: "",
    short_description: "",
    full_description: "",
    created_at: new Date().toISOString(),
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
    console.log("editing");
    e.preventDefault();
    const slug = formData.title.toLowerCase().replace(/ /g, "-");
    const payload = { ...formData, slug, price: Number(formData.price) };
    console.log("payload", payload, editingId);
    if (editingId) {
      // UPDATE existing
      const { error } = await supabase
        .from("events" as any)
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else toast({ title: "Success", description: "Event updated!" });
    } else {
      // INSERT new
      console.log("inserting");
      const { error, data } = await supabase
        .from("events" as any)
        .insert([payload]);
      console.log("insert result", { data, error });
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
      slug: event.slug || "",
      date: event.date || "",
      price: event.price || "",
      venue: event.venue || "",
      image: event.image || "",
      category: event.category || "",
      short_description: event.short_description || "",
      full_description: event.full_description || "",
      time: event.time || "",
      location: event.location || "",
      featured: event.featured || false,
      created_at: event.created_at || new Date().toISOString(),
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
      short_description: "",
      full_description: "",
      slug: "",
      time: "",
      location: "",
      featured: false,
      created_at: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  console.log({ authLoading, fetchingData, dbEvents });

  if (authLoading || (fetchingData && dbEvents.length === 0)) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loading />
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
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase">
                    Featured
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featured: e.target.textContent === "true",
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase">Time</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
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
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase">
                    Short Description
                  </label>
                  <input
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.short_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        short_description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase">
                    Full Description
                  </label>
                  <input
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.full_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        full_description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase">
                    Location
                  </label>
                  <input
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase">
                    Created At
                  </label>
                  <input
                    className="w-full p-3 rounded-xl border bg-muted/50 focus:ring-2 ring-primary outline-none"
                    value={formData.created_at}
                    onChange={(e) =>
                      setFormData({ ...formData, created_at: e.target.value })
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
