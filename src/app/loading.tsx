import { IconRotateClockwise } from "@tabler/icons-react";
export default function Loading() {
  // Or a custom loading skeleton component
  console.log("Loading music page...1");
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <IconRotateClockwise className="animate-spin" />
    </div>
  );
}
