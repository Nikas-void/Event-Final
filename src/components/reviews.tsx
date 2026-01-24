"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2, Trash2, Star } from "lucide-react";

export const Reviews = ({ eventId }: { eventId: string }) => {
  const { user, role } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews" as any)
      .select("*")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });

    if (!error) setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [eventId]);

  const handleSubmit = async () => {
    if (!newReview.trim()) return;

    const { error } = await supabase.from("reviews" as any).insert({
      event_id: eventId,
      user_id: user?.id,
      user_email: user?.email,
      content: newReview,
      rating: rating,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setNewReview("");
      fetchReviews();
      toast({ title: "Success", description: "Review posted!" });
    }
  };

  const deleteReview = async (reviewId: string) => {
    const { error } = await supabase
      .from("reviews" as any)
      .delete()
      .eq("id", reviewId);
    if (!error) fetchReviews();
  };

  return (
    <div className="mt-12 space-y-8">
      <h3 className="text-2xl font-bold">Community Reviews</h3>

      {/* Write a Review */}
      {user ? (
        <div className="space-y-4 p-6 border rounded-2xl bg-card">
          <Textarea
            placeholder="Write your thoughts..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  className={`w-5 h-5 cursor-pointer ${
                    rating >= num ? "fill-primary text-primary" : "text-muted"
                  }`}
                  onClick={() => setRating(num)}
                />
              ))}
            </div>
            <Button onClick={handleSubmit}>Post Review</Button>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center border rounded-2xl bg-muted/30">
          <p>Please sign in to leave a review.</p>
        </div>
      )}

      {/* Display Reviews */}
      <div className="space-y-4">
        {loading ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="p-4 border rounded-xl relative group">
              <div className="flex justify-between">
                <span className="font-semibold text-sm">{r.user_email}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex my-1">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mt-2">{r.content}</p>

              {(user?.id === r.user_id || role === "admin") && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive"
                  onClick={() => deleteReview(r.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
