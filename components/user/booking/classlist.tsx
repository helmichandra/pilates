import ClassCard from "./classcard";

interface Class {
  id: string;
  time: string;
  duration: string;
  title: string;
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
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">No classes available for this date.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4 pb-32 md:pb-8 mb-14">
      {classes.map((classItem) => (
        <ClassCard
          key={classItem.id}
          {...classItem}
          onBook={() => onBookClass(classItem.id)}
        />
      ))}
    </div>
  );
}