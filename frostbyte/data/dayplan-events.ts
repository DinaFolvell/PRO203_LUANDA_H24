// data/day-plan-events.ts

export type DayPlanEvent = {
  id: string;        // unique ID for navigation
  start: string;     // "HH:MM"
  end: string;       // "HH:MM"
  title: string;
  description: string;
  color: string;     // HEX color
};

// your event list, fully typed
export const dayPlanEvents: DayPlanEvent[] = [
  {
    id: "1",
    start: "08:00",
    end: "09:00",
    title: "Innsjekk",
    description: "Sjekk inn alle barna",
    color: "#D6ECDA", // light green
  },
  {
    id: "2",
    start: "09:00",
    end: "12:00",
    title: "Formiddagsaktivitet",
    description: "Lek og aktiviteter inne / ute",
    color: "#FFD0FB", // pink
  },
  {
    id: "3",
    start: "12:00",
    end: "13:00",
    title: "Julelunsj",
    description: "Vi serverer risgrøt med saft",
    color: "#FFE4C4", // light orange
  },
  {
    id: "4",
    start: "14:00",
    end: "16:00",
    title: "Tur til Lekang",
    description: "Vi planlegger å være tilbake kl 16:00",
    color: "#D0E8FF", // light blue
  },
];
