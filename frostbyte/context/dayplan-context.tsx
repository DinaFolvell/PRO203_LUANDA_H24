import { dayPlanEvents as initialEvents } from "@/data/dayplan-events";
import React, { createContext, useContext, useState } from "react";

export type DayPlanEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  color: string;
};

export type DayPlanContextType = {
  events: DayPlanEvent[];
  updateEvent: (id: string, updated: Partial<DayPlanEvent>) => void;
  addEvent: (event: DayPlanEvent) => void;
  deleteEvent: (id: string) => void;
};


const DayPlanContext = createContext<DayPlanContextType | null>(null);


export function DayPlanProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<DayPlanEvent[]>(initialEvents);

  const updateEvent = (id: string, updated: Partial<DayPlanEvent>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    );
  };

  const addEvent = (event: DayPlanEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <DayPlanContext.Provider
      value={{ events, updateEvent, addEvent, deleteEvent }}
    >
      {children}
    </DayPlanContext.Provider>
  );
}

export function useDayPlan() {
  const context = useContext(DayPlanContext);
  if (!context) {
    throw new Error("useDayPlan must be used inside a DayPlanProvider");
  }
  return context;
}
