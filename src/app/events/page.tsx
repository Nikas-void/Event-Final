

import { Events } from "@/components/EventsPage";
import { supabase } from "@/integrations/supabase/client"; 
import React from "react";

export const revalidate = 0;


const Page = async () => {
 
  const { data, error } = await supabase
    .from("events" as any)
    .select("*")
    .throwOnError(); 
    
  return <Events events={data || []} />;
};
export default Page;