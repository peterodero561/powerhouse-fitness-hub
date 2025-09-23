import React, { useState } from "react";
import { MapPin, X } from "lucide-react";

type Props = {
  /** Full google maps url (if omitted we use a sensible default search url) */
  mapsUrl?: string;
  /** Short address or label to show in the popover */
  label?: string;
  /** tweak the top offset if your navbar height is different */
  topOffsetClass?: string; // e.g. "top-20" or "top-24"
};

const FloatingMapButton: React.FC<Props> = ({
  mapsUrl,
  label = "PowerHouse Gym — Nairobi",
  topOffsetClass = "top-20",
}) => {
  const [open, setOpen] = useState(false);

  const defaultUrl =
    "https://www.google.com/maps/search/?api=1&query=PowerHouse+Gym+NaKuru";
  const href = mapsUrl || defaultUrl;

  return (
    <div className={`fixed right-6 ${topOffsetClass} z-50`}>
      <div className="relative">
        {/* main round button */}
        <button
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-label="Open business location"
          className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E2C044]"
        >
            {/* Using lucide MapPin (monochrome) — can replace with custom Google SVG if you want the multi-color pin */}
          <MapPin className="w-7 h-7 text-red-600" />
        </button>

        {/* popover card (appears when clicked) */}
        {open && (
          <div
            role="dialog"
            aria-label="Location card"
            className="absolute right-0 mt-3 w-64 bg-white text-[#0F1108] rounded-lg shadow-xl ring-1 ring-black/5 p-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold">{label}</div>
                <div className="text-xs text-[#637074] mt-1">
                  Tap the button to open this location in Google Maps.
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="ml-2 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 flex space-x-2">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded bg-[#E2C044] text-[#0F1108] font-medium text-sm hover:opacity-95"
              >
                Open in Google Maps
              </a>
              <button
                onClick={() => {
                  // quick copy link (nice UX) - fallback to open the map if copy not desired
                  try {
                    navigator.clipboard?.writeText(href);
                    // small feedback approach: close after copy
                    setOpen(false);
                    // optional: you could show a toast/snackbar here
                  } catch (e) {
                    // if clipboard not available, just open the link
                    window.open(href, "_blank", "noopener");
                  }
                }}
                className="px-3 py-2 rounded border border-[#E2C044] text-[#E2C044] text-sm"
                title="Copy map link"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingMapButton;