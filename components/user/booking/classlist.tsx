"use client";
import { motion, AnimatePresence } from "framer-motion";
import ClassCard from "./classcard";
import SkeletonCard from "./skeletoncard"; 
import { Info } from "lucide-react";

export default function ClassList({ classes, onBookClass, isLoading }: any) {
  const safeClasses = Array.isArray(classes) ? classes : [];

  // JIKA SEDANG LOADING: Tampilkan Skeleton, JANGAN tampilkan pesan "No Classes"
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // JIKA SUDAH SELESAI LOADING & DATA KOSONG: Baru tampilkan pesan ini
  if (safeClasses.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-4 py-20 text-center flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Info className="text-gray-200" size={40} />
        </div>
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
          No classes available for this date/filter.
        </p>
      </motion.div>
    );
  }

  // JIKA DATA ADA: Tampilkan dengan animasi
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <AnimatePresence mode="popLayout">
        {safeClasses.map((classItem: any, idx: number) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <ClassCard
              {...classItem}
              onBook={() => onBookClass(classItem.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}