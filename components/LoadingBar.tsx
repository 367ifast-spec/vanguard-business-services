"use client";

import { useEffect, useState } from "react";

export default function LoadingBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(100);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[9999] h-1 w-full bg-transparent">
      <div
        className="h-full bg-blue-600 transition-all duration-700"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}