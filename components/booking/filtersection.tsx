"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSectionProps {
  onTypeChange: (type: string) => void;
  onLevelChange: (level: string) => void;
}

export default function FilterSection({
  onTypeChange,
  onLevelChange,
}: FilterSectionProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Type Filter */}
          <div>
            <Select onValueChange={onTypeChange} defaultValue="all">
              <SelectTrigger className="w-full h-12 border-2 cursor-pointer">
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase">Type</p>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="reformer">Reformer</SelectItem>
                <SelectItem value="chair">Chair</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Level Filter */}
          <div>
            <Select onValueChange={onLevelChange} defaultValue="all">
              <SelectTrigger className="w-full h-12 border-2 cursor-pointer">
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase">Level</p>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
