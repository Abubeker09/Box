'use client'

import DropzoneComponent from 'react-dropzone'

import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';

const Dropzone = () => {
  const [loading, setLoading] = useState(false)
  const { isLoaded, isSignedIn, user } = useUser()

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      // Read the file contents once readAsDataURL is completed:
      reader.onabort = (e) => console.log('file reading was aborted');
      reader.onerror = (e) => console.log('file reading has failed');
      reader.onload = async () => {
        await uploadPost(file)
      }
      reader.readAsArrayBuffer(file)
    })
  }

  const uploadPost = async (selectedFile: File) => {
    if(loading) return
    if(!user) return

    setLoading(true)
    const toastId = toast.loading("Uploading...")
    // 
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    })

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)

    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef)
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      })
    })

    toast.success("Uploaded Successfuly", {
      id: toastId,
    })

    setLoading(false)
  }

  const maxSize = 20971520;
  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections
      }) => {
        const isFileToolarge = 
        fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
        <section className='m-4 cursor-pointer'>
          <div 
          {...getRootProps()}
          className={cn(
            "w-full h-52 flex justify-center items-center p-5 border border-dashed border-orange-900 rounded-lg text-center",
            isDragActive ? "border-orange-400 bg-orange-700" :  "border-orange-900 dark:bg-slate-900 bg-slate-200",
          )}
          >
            <input {...getInputProps()} />
            {!isDragActive && 'Click hear or drop a file to upload!'}
            {isDragActive && !isDragReject && 'Drop to upload this file!'}
            {isDragReject && 'File type not accepted, sorry!'}
            {isFileToolarge && (
              <div className='text-danger mt-2'>File is to large.</div>
            )}
          </div>
        </section>
      )}}
    </DropzoneComponent>
  )
}

export default Dropzone

