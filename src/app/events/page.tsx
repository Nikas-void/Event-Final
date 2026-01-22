import { Events } from "@/components/EventsPage";
import { supabase } from "@/lib/supabase/client";
import React from "react";
const Page = async () => {
  const { data, error } = await supabase.from("events").select("*");
  console.log(data);
  return <Events events={data} />;
};

export default Page;
