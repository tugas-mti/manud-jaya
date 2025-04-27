"use client";

import { Dropdown } from "@/app/components/dropdown";
import { BookingStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

async function patchChangeStatus(
  bookingId: string,
  status: BookingStatus
): Promise<{ data: { status: BookingStatus } }> {
  const response = await fetch(`/api/bookings/${bookingId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 400) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error);
  }

  if (!response.ok) {
    throw new Error("Failed to update booking status");
  }

  return response.json();
}

type ChangeStatusProps = {
  bookingId: string;
  onSuccess?: () => void;
};

export default function ChangeStatus({
  bookingId,
  onSuccess,
}: ChangeStatusProps) {
  const router = useRouter();

  const handleChangeStatus = async (status: BookingStatus) => {
    toast.promise(patchChangeStatus(bookingId, status), {
      loading: "Updating status...",
      success: () => `Status updated to ${status}`,
      error: (error) => `Error: ${error.message}`,
    });

    onSuccess?.();
    router.refresh();
  };

  return (
    <Dropdown
      menus={Array.from(Object.values(BookingStatus)).map((status) => ({
        label: status,
        onClick: () => handleChangeStatus(status),
      }))}
    >
      Change Status
    </Dropdown>
  );
}
