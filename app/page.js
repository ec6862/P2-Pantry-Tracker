'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography } from "@mui/material"
import { collection, deleteDoc, doc, getDoc, getDocs, query } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

const updateInventory = async () => {
  const snapshot = query(collection(firestore, "inventory"))
  const docs = await getDocs(snapshot)
  const inventoryList = []

  docs.forEach((doc) => { // fetches the data; for each doc, pushes the name and data into inventoryList
    inventoryList.push({
      name: doc.id,
      ...doc.data(),
    })
  })
  setInventory(inventoryList)
  console.log(inventoryList)
}

const addItems = async (item) => {
  const docRef = doc(collection(firestore, "inventory"), item)
  const docSnap = await getDocs(docRef)

  if (docSnap.exists()) {
    const {count} = docSnap.data()
    await setDoc(docRef, {count: count + 1})
  } else {
    await setDoc(docRef, {count: 1})
  }
}

const removeItems = async (item) => {
  const docRef = doc(collection(firestore, "inventory"), item)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const {count} = docSnap.data()
    if (count === 1) {
      await deleteDocs(docRef)
    } else {
      await setDoc(docRef, {count: count - 1})
    }
  }
  await updateInventory()
}

const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)

useEffect(() => {
  updateInventory();
}, [])

  return (
   <Box>
      <Typography variant="h1">Inventory Management</Typography>
      {inventory.forEach((item) => {
        return (
          <>
            {item.name}
            {item.count}
          </>
        )
      })}
   </Box>
  );
}
