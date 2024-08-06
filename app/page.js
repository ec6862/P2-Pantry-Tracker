'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Modal, Typography, Stack, TextField, Button } from "@mui/material"
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, query } from "firebase/firestore";

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
  const docRef = doc(collection(firestore, "inventory"), item);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { count } = docSnap.data();
    await setDoc(docRef, { count: count + 1 });
  } else {
    await setDoc(docRef, { count: 1 });
  }
};

const removeItems = async (item) => {
  const docRef = doc(collection(firestore, "inventory"), item)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const {count} = docSnap.data()
    if (count === 1) {
      await deleteDoc(docRef)
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
}, [addItems, removeItems])

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      flexDirection="column"
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            // ONLY FOR MUI: since Material UI doesn't have prebuilt transform, need to create our own transform
            transform: "translate(-50%,-50%)",
          }}
        >
          <Typography variant="h6">Add Items</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItems(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      {/* <Typography variant="h1">Inventory Management</Typography>
      {inventory.forEach((item) => {
        return (
          <>
            {item.name}
            {item.count}
          </>
        )
      })} */}
      <Button
        variant="contained"
        onClick={() => {
          handleOpen();
        }}
      >
        Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box
          width="800px"
          height="100px"
          bgcolor="#ADD8E6"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" color="#333">
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {inventory.map(({ name, count }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#f0f0f0"
              padding={5}
            >
              <Typography variant="h3" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#333" textAlign="center">
                {count}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  removeItems(name);
                }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
