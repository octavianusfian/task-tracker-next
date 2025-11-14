export const TaskListSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-24 rounded border animate-pulse" />
      ))}
    </div>
  );
};

export default TaskListSkeleton;
