"use client";

import { motion } from "framer-motion";
import ClassCard from "./classcard";
import { Info } from "lucide-react";

interface Class {
  id: string;
  time: string;
  duration: string;
  title?: string; // Menampung jika fieldnya title
  name?: string;  // Menampung jika fieldnya name
  type: "reformer" | "chair" | "private";
  credit: number;
  level: string;
  coach: string;
  location: string;
  spotsLeft: number;
  status?: "passed" | "available";
}

interface ClassListProps {
  classes: Class[];
  onBookClass: (classId: string) => void;
}

export default function ClassList({ classes, onBookClass }: ClassListProps) {
  if (classes.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Info className="text-gray-200" size={40} />
        </div>
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
          No classes available for this date.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 pb-32">
      {classes.map((classItem, idx) => (
        <motion.div
          key={classItem.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <ClassCard
            {...classItem}
            // Memastikan jika API mengirim 'name', ia akan tampil sebagai 'title' di Card
            title={classItem.title || classItem.name || "Untitled Class"} 
            onBook={() => onBookClass(classItem.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}