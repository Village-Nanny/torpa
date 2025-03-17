import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../dialog';
import { Button } from '../atoms/button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isConfirmLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isConfirmLoading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-3xl border-none p-8 md:p-12 gap-8">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-2xl font-bold text-gray-800">{title}</DialogTitle>
          <DialogDescription className="text-base text-gray-500">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4 sm:gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isConfirmLoading}
            className="flex-1 bg-white text-gray-800 hover:text-gray-600 border-gray-200 hover:bg-gray-50 font-medium text-base py-6">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isConfirmLoading}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium text-base py-6">
            {isConfirmLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Leaving...
              </>
            ) : (
              'Leave Game'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
