
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
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProjectSchema } from "@/schema/Schema";
import { toast } from 'sonner'
import {  doc, setDoc } from "firebase/firestore";
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
        <EditForm eData={eData} setData={setData}/>
      </DialogContent>
    </Dialog>
  );
}

function EditForm({ eData, setData }) {
  const form = useForm({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      client_name: eData.client_name,
      project_name: eData.project_name,
      price: eData.price,
      email: eData.email,
      status: eData.status,
      phone: eData.phone,
    },
  });

  async function onSubmit(data) {

    const allData = {
     id: eData.id, ...data,
    };
    
    try { 
      await setDoc(doc(db, "MyProject", eData.id), allData);
      console.log('Data saved successfully');
      toast.success('Data saved successfully!');
      setData(prevData => prevData.map(item => (item.id === allData.id) ? { ...item, ...allData } : item));
    } catch (error) {
      console.error('Unexpected Error:', error);
      toast.error('Error in saving data!')
    } 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status: </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
