"use client"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from '@/app/config/firebaseConfig'
import { useEffect } from "react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    edit: "Edit",
    delete: "Delete",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    edit: "Edit",
    delete: "Delete",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    edit: "Edit",
    delete: "Delete",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    edit: "Edit",
    delete: "Delete",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    edit: "Edit",
    delete: "Delete",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
    edit: "Edit",
    delete: "Delete",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
    edit: "Edit",
    delete: "Delete",
  },
]

export default function List() {
  const getEmployees = async () => {
    try{
      // const querySnapshot = await getDocs(collection(db, "LaborDetails"));
      // const employees = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      // setEmployees(employees);
      console.log('hi1')

      const querySnapshot = await getDocs(collection(db, "LaborDetails"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });


    } catch (e) {
      console.error("Error reading document: ", e);
    }
  }

  useEffect(() => {
    getEmployees()
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow className=" text-base">
          <TableHead className="w-[100px] text-">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-center w-10" colSpan={2}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.totalAmount}</TableCell> 
            <TableCell className="text-right w-0"><Button>{invoice.edit}</Button></TableCell>
            <TableCell className="text-left w-0"><Button>{invoice.delete}</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
