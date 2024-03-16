"use client"
import React, { useState } from 'react'
import List from './List'
import { Add } from './Add'
import { SkeletonCard } from '@/components/Skeleton';

function Dashboard() {
  const [data, setData] = useState([]);

  return (
    <div className='w-[90%] mx-auto'>
      <Add setData={setData}/>
      <List data={data} setData={setData}/>
    </div>
  )
}

export default Dashboard