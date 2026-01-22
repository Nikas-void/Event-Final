"use client";

export default function MapEmbed() {
  return (
    <div className="w-full h-62.5 rounded-xl overflow-hidden border">
      <iframe
        src="https://maps.app.goo.gl/ryWTGbqoe5ChGmnm7"
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="border-0"
        allowFullScreen
      />
    </div>
  );
}
