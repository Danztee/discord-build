"use client";

import React from "react";
import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

type SocketIndicatorProps = {};

const SocketIndicator: React.FC<SocketIndicatorProps> = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white border-none">
        Fallback
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
      Live: Real time update
    </Badge>
  );
};
export default SocketIndicator;
