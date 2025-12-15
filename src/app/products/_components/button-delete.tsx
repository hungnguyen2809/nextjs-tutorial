'use client';

import { apiProduct } from '@/apis/apiProduct';
import { HttpError } from '@/apis/http';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const ButtonDeleteProduct = ({ productId }: { productId: number }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await apiProduct.delete(productId);

      toast.success('Delete success');
      router.refresh();
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message || 'Delete failed');
      } else {
        alert(JSON.stringify(error));
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="text-red-500 cursor-pointer select-none">Delete</div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc muốn xóa sản phẩm này?</AlertDialogTitle>
          <AlertDialogDescription>Đồng ý với việc xóa sản phẩm không thể hoàn tác.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Đồng ý</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonDeleteProduct;
