// import { Events } from "@/components/EventsPage";
// import { supabase } from "@/lib/supabase/client";
// import React from "react";
// export const revalidate = 0;
// const Page = async () => {
//   const { data, error } = await supabase.from("events").select("*");
//   console.log(data);
//   return <Events events={data} />;
// };

// export default Page;

// import { Events } from "@/components/EventsPage";
// import { supabase } from "@/lib/supabase/client";
// import React from "react";

// export const revalidate = 0;

// const Page = async () => {
//   try {
//     // 1. Fetch with a simple log to see timing in terminal
//     console.log("📡 Supabase Fetch Started...");

//     const { data, error } = await supabase
//       .from("events")
//       .select("*")
//       .order("created_at", { ascending: false }); // Helpful to keep list organized

//     if (error) {
//       console.error("❌ Supabase Error:", error.message);
//       return (
//         <div className="p-10 text-red-500">Database Error: {error.message}</div>
//       );
//     }

//     if (!data) {
//       return <div className="p-10">No events found.</div>;
//     }

//     console.log("✅ Data received, count:", data.length);
//     return <Events events={data} />;
//   } catch (err) {
//     console.error("💥 Unexpected System Error:", err);
//     return <div className="p-10">Something went wrong. check console.</div>;
//   }
// };

// export default Page;


import { Events } from "@/components/EventsPage";
import { supabase } from "@/integrations/supabase/client"; // Use the same one as your slug page
import React from "react";

export const revalidate = 0;

const Page = async () => {
  // Add a limit so it doesn't try to pull 1000s of rows if the DB grows
  const { data, error } = await supabase
    .from("events" as any)
    .select("*")
    .limit(50) 
    .order("created_at", { ascending: false });

  if (error) return <div className="p-10">Error: {error.message}</div>;
  
  return <Events events={data || []} />;
};

export default Page;