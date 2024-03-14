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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { toast } from 'sonner'

export function Delete({ id, setData }) {

  const deleteData = async () => {
    try {
      await deleteDoc(doc(db, 'MyProject', id)); 
      setData(prevData => prevData.filter(item => item.id !== id));
      toast.success('Data successfully deleted!');
      console.log('Data successfully deleted!!');
    } catch (error) {
      toast.error('Error in deleting!');
      console.error("Error deleting document:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive" onClick={deleteData}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
