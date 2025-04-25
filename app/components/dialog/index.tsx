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
          <div>{children}</div>
        </DialogHeader>
      </DialogContent>
    </DialogPrimitive>
  );
};

Dialog.displayName = "Dialog";
