export function Avatar({ name, size = 7 }: { name: string; size?: number }) {
    return (
      <div
        className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-500 rounded-full`}
      >
        <span className="font-medium text-white px-2">
          {name[0]}
        </span>
      </div>
    );
  }