"use client";

import { Drawer as DrawerVaul } from "vaul";
import React, { useState } from "react";
import clsx from "clsx";

type DrawerProps = {
  children?: React.ReactNode;
  trigger?: string;
  title?: string;
};

const snapPoints = [0.9];

export default function Drawer({ trigger, title, children }: DrawerProps) {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <DrawerVaul.Root
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <DrawerVaul.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden  px-4 text-sm font-medium">
        {trigger ?? "Open"}
      </DrawerVaul.Trigger>
      <DrawerVaul.Overlay className="fixed inset-0 bg-black/40" />
      <DrawerVaul.Portal>
        <DrawerVaul.Content
          data-testid="content"
          className="fixed flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[97%] mx-[-1px]"
        >
          <div
            className={clsx("flex flex-col max-w-md mx-auto w-full p-4 pt-5", {
              "overflow-y-auto": snap === 0.9,
              "overflow-hidden": snap !== 0.9,
            })}
          >
            <DrawerVaul.Title className="text-2xl mt-2 font-medium text-gray-900">
              {title ?? "Receipt"}
            </DrawerVaul.Title>
            <DrawerVaul.Description className="mt-2 text-sm text-gray-500">
              {children}
            </DrawerVaul.Description>
          </div>
        </DrawerVaul.Content>
      </DrawerVaul.Portal>
    </DrawerVaul.Root>
  );
}
