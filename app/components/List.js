"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/app/config/firebaseConfig'
import { useEffect, useState } from "react";
import { Delete } from "./Delete";
import { Badge } from "@/components/ui/badge";
import { Edit } from "./Edit";
import { SkeletonCard } from "@/components/Skeleton";

export default function List({ data, setData }) {
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "MyProject"));
      const newData = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      setData(newData);
    } catch (e) {
      console.error("Error reading document: ", e);
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
      fetchData();
  }, []);

  return (
    <Table className="border-t-2">
      <TableHeader>
        <TableRow className=" text-base">
          <TableHead className="w-[60px]">#</TableHead>
          <TableHead>Client Name</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center w-10" colSpan={2}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {loading ? (
        <TableRow>
        <TableCell><SkeletonCard /></TableCell>
        <TableCell><SkeletonCard /></TableCell>
        <TableCell><SkeletonCard /></TableCell>
        <TableCell><SkeletonCard /></TableCell>
        <TableCell><SkeletonCard /></TableCell>
        <TableCell><SkeletonCard /></TableCell>
        <TableCell><SkeletonCard /></TableCell>
      </TableRow>
       ) : data.length > 0 ? (
        data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.client_name}</TableCell>
            <TableCell>{item.project_name}</TableCell>
            <TableCell>{item.price}</TableCell> 
            <TableCell>
              <Badge className={`${(item.status === 'Pending') ? 'bg-blue-200 text-black' : (item.status === 'Ongoing') ? 'bg-yellow-200 text-black' : 'bg-green-200 text-black`'}`}>{item.status}</Badge>
              </TableCell> 
            <TableCell className="text-right w-0 p-0"><Edit eData={item} setData={setData}/></TableCell>
            <TableCell className="text-left w-0"><Delete id={item.id} setData={setData} /></TableCell>
          </TableRow>
          ))
          ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No data found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
