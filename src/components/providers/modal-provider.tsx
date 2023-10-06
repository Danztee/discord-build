"use client";

import React, { useEffect, useState } from "react";
import { CreateServerModal } from "../modals/create-server-modal";

const ModalProvider = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <CreateServerModal />
    </>
  );
};

export default ModalProvider;
