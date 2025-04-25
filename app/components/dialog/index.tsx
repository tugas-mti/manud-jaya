import { ReactNode } from "react";
import {
  Dialog as DialogPrimitive,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./base-dialog";

type DialogProps = React.ComponentProps<typeof DialogPrimitive> & {
  title: string;
  children?: ReactNode;
  open?: boolean;
  onCancel?: () => void;
};

export const Dialog = ({
  title,
  children,
  open,
  onCancel,
  ...props
}: DialogProps) => {
  return (
    <DialogPrimitive open={open} onOpenChange={onCancel} {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="min-h-0 max-h-[90vh] overflow-y-auto p-2">
          {children}
        </div>
      </DialogContent>
    </DialogPrimitive>
  );
};

Dialog.displayName = "Dialog";
