"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProjectSchema } from "@/schema/Schema";
import { toast } from "sonner";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export function Add({ setData }) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className="my-2" variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Project Details</DialogTitle>
        </DialogHeader>
        <AddForm setData={setData} />
      </DialogContent>
    </Dialog>
  );
}

function AddForm({ setData }) {
  const form = useForm({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      client_name: "",
      project_name: "",
      price: "",
      email: "",
      status: "Pending",
      phone: "",
    },
  });
  const { handleSubmit, reset } = form; 
  async function onSubmit(data) {

    try {
      const docRef = await addDoc(collection(db, "MyProject"), data);
      const docId = docRef.id; 
      toast.success('Data saved successfully!');
      setData(prevData => [...prevData, { id: docId, ...data }]);
      reset();
    } catch (error) {
      console.error('Unexpected Error:', error);
      toast.error('Error in saving data!')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <FormField control={form.control} name="client_name" render={({ field }) => (
            <FormItem><FormLabel>Client Name: </FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="project_name" render={({ field }) => (
            <FormItem><FormLabel>Project Name: </FormLabel>
              <FormControl><Input placeholder="Some system" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem><FormLabel>Price: </FormLabel>
              <FormControl><Input placeholder="0000000" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email: </FormLabel>
              <FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Phone: </FormLabel>
              <FormControl><Input placeholder="123456890" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
