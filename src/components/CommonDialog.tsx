import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";


interface CommonDialogProps {
    trigger?: ReactNode;
    title: string;
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    showCloseButton?: boolean;
}

const CommonDialog: React.FC<CommonDialogProps> = ({
    trigger,
    title,
    children,
    open,
    onOpenChange,
    showCloseButton = true,
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent
                className="max-w-md sm:max-w-lg md:max-w-xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="mt-2">{children}</div>
                {showCloseButton && (
                    <div className="mt-4 text-right">
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Close</Button>
                        </DialogClose>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CommonDialog;
