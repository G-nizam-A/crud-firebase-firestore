
"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
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
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export function Edit({ eData, setData }) {
  return (
    <Dialog className="!max-w-xl">
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Project Details</DialogTitle>
        </DialogHeader>
        <Form eData={eData} setData={setData}/>
      </DialogContent>
    </Dialog>
  );
}

const Form = React.forwardRef(({ className, eData, setData }, ref) => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({ resolver: zodResolver(ProjectSchema) });
  async function editNewData(data) {

    const allData = {
      id: eData.id,
      ...data,
      phone: +data.phone,
      price: +data.price,
      pending_amount: +data.price,
      project_given_date: new Date().toISOString().split('T')[0],
      project_submitted_date: null,
    };

    console.log('Data',eData.id, allData);
    try { 
      await setDoc(doc(db, "MyProject", eData.id), allData);
      console.log('Data saved successfully');
      toast.success('Data saved successfully!');
      console.log('allData', allData.id, 'item.id');
      setData(prevData => prevData.map(item => (item.id === allData.id) ? { ...item, ...allData } : item));
    } catch (error) {
      console.error('Unexpected Error:', error);
      toast.success('Error in saving data!')
    } 
  }

  return (
    <form ref={ref} onSubmit={handleSubmit(editNewData)} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="client_name">Client Name:</Label>
        <Input defaultValue={eData.client_name} type="text" id="client_name" placeholder="Client name" {...register("client_name")}/>
        {errors.client_name?.message && <span className="text-red-500 text-xs italic"> {errors.client_name?.message.toString()}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email:</Label>
        <Input defaultValue={eData.email} type="email" id="email" placeholder="some@example.com" {...register("email")}/>
        {errors.email?.message && <span className="text-red-500 text-xs italic"> {errors.email?.message.toString()}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone:</Label>
        <Input defaultValue={eData.phone} type="text" id="phone" placeholder="9876543210" {...register("phone")}/>
        {errors.phone?.message && <span className="text-red-500 text-xs italic"> {errors.phone?.message.toString()}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="project_name">Project Name</Label>
        <Input defaultValue={eData.project_name} type="text" id="project_name" placeholder="Project name" {...register("project_name")}/>
        {errors.project_name?.message && <span className="text-red-500 text-xs italic"> {errors.project_name?.message.toString()}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price ">Price: </Label>
        <Input defaultValue={eData.price} type="text" id="price " placeholder="Project price" {...register("price")}/>
        {errors.price?.message && <span className="text-red-500 text-xs italic"> {errors.price?.message.toString()}</span>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price ">Status: </Label>
        <Select defaultValue={eData.status} id="status " {...register("status")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
        <SelectContent>
            <SelectGroup>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Ongoing">Ongoing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
 );
});