
"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProjectSchema } from "@/schema/Schema";
import { toast } from 'sonner'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export function Add({ setData }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Project Details</DialogTitle>
        </DialogHeader>
        <Form setData={setData}/>
      </DialogContent>
    </Dialog>
  );
}

function Form({ className, setData }) {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({ resolver: zodResolver(ProjectSchema) });
  async function addNewData(data) {

    const allData = {
      ...data,
      phone: +data.phone,
      price: +data.price,
      pending_amount: +data.price,
      project_given_date: new Date().toISOString().split('T')[0],
      project_submitted_date: null,
      status: "Pending",
    };

    console.log('Data',allData);
    try { 
      await addDoc(collection(db, "MyProject"), allData);
      console.log('Data saved successfully');
      toast.success('Data saved successfully!');
      setData(prevData => [...prevData, allData]);
    } catch (error) {
      console.error('Unexpected Error:', error);
      toast.success('Error in saving data!')
    } 
  }

  return (
    <form  onSubmit={handleSubmit(addNewData)} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="client_name">Client Name:</Label>
        <Input type="text" id="client_name" placeholder="Client name" {...register("client_name")}/>
        {errors.client_name?.message && <span className="text-red-500 text-xs italic"> {errors.client_name?.message.toString()}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email:</Label>
        <Input type="email" id="email" placeholder="some@example.com" {...register("email")}/>
        {errors.email?.message && <span className="text-red-500 text-xs italic"> {errors.email?.message.toString()}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone:</Label>
        <Input type="text" id="phone" placeholder="9876543210" {...register("phone")}/>
        {errors.phone?.message && <span className="text-red-500 text-xs italic"> {errors.phone?.message.toString()}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="project_name">Project Name</Label>
        <Input type="text" id="project_name" placeholder="Project name" {...register("project_name")}/>
        {errors.project_name?.message && <span className="text-red-500 text-xs italic"> {errors.project_name?.message.toString()}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price ">Price: </Label>
        <Input type="text" id="price " placeholder="Project price" {...register("price")}/>
        {errors.price?.message && <span className="text-red-500 text-xs italic"> {errors.price?.message.toString()}</span>}
      </div>
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
}
