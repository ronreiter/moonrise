export type SessionIconName =
  | "wind"
  | "stretch"
  | "standing"
  | "waves"
  | "flame"
  | "moon"
  | "moonStar"
  | "bell"
  | "waveform"
  | "coffee"
  | "baby";

export type UiIconName = "mail" | "instagram" | "phone" | "pin" | "clock";

export type Session = {
  number: string;
  icon: SessionIconName;
  name: string;
  meta: string;
  description: string;
};

export type ScheduleDay = {
  day: string;
  note?: string;
  classes: { time: string; name: string; note?: string }[];
};

export type PricingOption = {
  name: string;
  price: string;
  per?: string;
  description: string;
  cta: string;
  featured?: boolean;
};

export const SITE_URL = "https://moonrisetlv.com";

export const studio = {
  name: "Moonrise",
  city: "Tel Aviv",
  area: "Florentin, Tel Aviv",
  tagline: "Yoga, Pilates & Sound — Tel Aviv",
  description:
    "Moonrise is a calm studio for movement and deep rest in Tel Aviv — yoga, pilates, sound evenings and space to land.",
  email: "hello@moonrisetlv.com",
  instagram: "@moonrisetlv",
  instagramUrl: "https://instagram.com/moonrisetlv",
  whatsapp: "+972 50-000-0000",
  hours: [
    { days: "Sun–Thu", time: "07:00–21:00" },
    { days: "Friday", time: "07:00–14:00" },
    { days: "Saturday", time: "Closed — rest day" },
  ],
};

export function bookingHref(subject?: string) {
  const base = `mailto:${studio.email}`;
  const text = subject ?? "Class booking — Moonrise";
  return `${base}?subject=${encodeURIComponent(text)}`;
}

export const booking = {
  label: "Book a class",
  href: bookingHref("Class booking — Moonrise"),
};

export const nav = [
  { label: "Sessions", href: "#sessions" },
  { label: "Evenings", href: "#evenings" },
  { label: "Schedule", href: "#schedule" },
  { label: "Pricing", href: "#pricing" },
  { label: "Visit", href: "#visit" },
];

export const hero = {
  eyebrow: "Yoga · Pilates · Sound — Tel Aviv",
  title: "Come *home* to yourself.",
  intro:
    "A calm studio for movement and deep rest — slow flows, strong flows, sound evenings and space to land, in the heart of Tel Aviv.",
  primaryCta: { label: "Book a class", href: booking.href },
  secondaryCta: { label: "Explore the sessions", href: "#sessions" },
};

export const about = {
  label: "The Studio",
  title: "Small on purpose. *Slow* on purpose.",
  paragraphs: [
    "Moonrise is a small studio built around one idea: your body already knows how to settle — it just needs the right conditions. Warm light, unhurried teaching, and room to breathe.",
    "We teach yoga and pilates the quiet way: no mirrors, no performance, no rush. Strength is built at the pace of your breath, and rest is treated as part of the practice — not a break from it.",
  ],
  principles: [
    {
      number: "01",
      title: "Slow is strong",
      body: "We move deliberately and let strength build at its own pace.",
    },
    {
      number: "02",
      title: "Breath first",
      body: "Every class begins and ends with the breath. Everything else follows.",
    },
    {
      number: "03",
      title: "Rest is practice",
      body: "Deep rest is not a reward for the work. It is the work.",
    },
  ],
};

export const sessions: Session[] = [
  {
    number: "01",
    icon: "wind",
    name: "Nervous System Reset",
    meta: "Restorative · 60 min",
    description:
      "Breath-led, floor-based and deliberately slow. Unwind the jaw and shoulders, and let your body remember what settled feels like.",
  },
  {
    number: "02",
    icon: "stretch",
    name: "Pilates",
    meta: "Mat · 50 min",
    description:
      "Precise mat pilates for posture, control and quiet core strength. Small movements, full attention.",
  },
  {
    number: "03",
    icon: "standing",
    name: "Yoga",
    meta: "Hatha · 60 min",
    description:
      "Foundational hatha — breath, alignment and simple, unhurried shapes. A steady place to begin, or to come back to.",
  },
  {
    number: "04",
    icon: "waves",
    name: "Soft Flow",
    meta: "Vinyasa · 60 min",
    description:
      "A vinyasa that moves like water. Slow transitions, long exhales, and no rush anywhere in the room.",
  },
  {
    number: "05",
    icon: "flame",
    name: "Power Flow",
    meta: "Vinyasa · 60 min",
    description:
      "Strong, rhythmic and warm. For the days you want to sweat, build heat and feel unmistakably alive.",
  },
  {
    number: "06",
    icon: "moon",
    name: "Yin Yoga",
    meta: "Yin · 75 min",
    description:
      "Long, quiet holds that reach into connective tissue and the busy mind. The practice of staying.",
  },
  {
    number: "07",
    icon: "moonStar",
    name: "Yin & Reiki",
    meta: "Yin · Reiki · 75 min",
    description:
      "Yin shapes held while hands-on Reiki moves through the room. Deep rest with a gentle current underneath.",
  },
  {
    number: "08",
    icon: "bell",
    name: "Sound Healing",
    meta: "Sound · 60 min",
    description:
      "Tibetan bowls, gongs, chimes and voice — a live soundscape that shifts your state and quiets the noise.",
  },
  {
    number: "09",
    icon: "waveform",
    name: "Sound Bath",
    meta: "Sound · 60 min",
    description:
      "Lie down, close your eyes and let the instruments do the work. An immersion in vibration and rest.",
  },
  {
    number: "10",
    icon: "coffee",
    name: "Cacao & Yoga Nidra",
    meta: "Ceremony · 90 min · Monthly",
    description:
      "A warm cup of ceremonial cacao, then guided yoga nidra — sleep-adjacent rest that resets the whole system.",
  },
  {
    number: "11",
    icon: "baby",
    name: "Parental Yoga",
    meta: "Gentle · 60 min",
    description:
      "A soft, adaptable practice for parents and parents-to-be — room for your body, your breath and your season of life.",
  },
];

export const evenings = {
  label: "Evenings",
  title: "After dark, we slow all the way *down*.",
  intro:
    "Once a week we clear the schedule, dim the lights and bring out the instruments. Sound, ceremony and rest — the softest way to close a day.",
  items: [
    {
      name: "Sound Healing",
      note: "Bowls, gongs and voice in a live soundscape.",
    },
    {
      name: "Sound Bath",
      note: "An hour lying down inside the vibration.",
    },
    {
      name: "Cacao & Yoga Nidra",
      note: "Warm cacao, then guided rest — monthly.",
    },
  ],
  cta: { label: "See this week’s evenings", href: "#schedule" },
};

export const schedule: { label: string; title: string; note: string; days: ScheduleDay[] } = {
  label: "Schedule",
  title: "This week at the studio.",
  note: "Reserve by message and we’ll keep a mat for you. The schedule changes monthly — reach out for the current week.",
  days: [
    {
      day: "Sunday",
      classes: [
        { time: "07:30", name: "Soft Flow" },
        { time: "12:30", name: "Pilates" },
        { time: "19:00", name: "Yin Yoga" },
      ],
    },
    {
      day: "Monday",
      classes: [
        { time: "08:00", name: "Power Flow" },
        { time: "18:00", name: "Nervous System Reset" },
        { time: "20:00", name: "Sound Bath", note: "Evening" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { time: "07:30", name: "Pilates" },
        { time: "12:30", name: "Yoga" },
        { time: "19:30", name: "Soft Flow" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { time: "08:00", name: "Power Flow" },
        { time: "18:00", name: "Yin & Reiki" },
        { time: "20:00", name: "Cacao & Yoga Nidra", note: "Monthly" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { time: "07:30", name: "Soft Flow" },
        { time: "18:00", name: "Pilates" },
        { time: "19:30", name: "Sound Healing", note: "Evening" },
      ],
    },
    {
      day: "Friday",
      note: "One slow class to close the week.",
      classes: [{ time: "09:00", name: "Soft Flow" }],
    },
    {
      day: "Saturday",
      note: "Rest day — the studio is quiet.",
      classes: [],
    },
  ],
};

export const pricing: { label: string; title: string; note: string; options: PricingOption[] } = {
  label: "Pricing",
  title: "Simple, honest pricing.",
  note: "10-class packs, private sessions and gift cards are available — just ask.",
  options: [
    {
      name: "First class",
      price: "₪40",
      description: "For new students. Come see how it feels — no pressure, no commitment.",
      cta: "Book your first class",
    },
    {
      name: "Drop-in",
      price: "₪75",
      description: "One class, whenever it fits your week — mat, props and tea included.",
      cta: "Book a drop-in",
    },
    {
      name: "Unlimited",
      price: "₪520",
      per: "/ month",
      description: "Every class and every evening at the studio. Pause or cancel anytime.",
      cta: "Go unlimited",
      featured: true,
    },
  ],
};

export const philosophy = {
  quote:
    "We don’t practice to become someone new. We practice to remember how it feels to be at home in a body.",
  attribution: "A Moonrise studio note",
};

export const visit = {
  label: "Visit",
  title: "Find us in *Tel Aviv*.",
  area: "Florentin, Tel Aviv",
  addressNote:
    "The full address and directions are shared when you book — or message us and we’ll send you the way.",
  contactLabel: "Say hello",
  rows: [
    { label: "Email", icon: "mail" as const, value: studio.email, href: bookingHref("Hello Moonrise") },
    { label: "Instagram", icon: "instagram" as const, value: studio.instagram, href: studio.instagramUrl },
    { label: "WhatsApp", icon: "phone" as const, value: studio.whatsapp },
  ],
  hoursLabel: "Studio hours",
};

export const footer = {
  tagline: "Yoga, pilates and sound — in the heart of Tel Aviv.",
  exploreLabel: "Explore",
  contactLabel: "Contact",
  note: "Made with care in Tel Aviv.",
};
