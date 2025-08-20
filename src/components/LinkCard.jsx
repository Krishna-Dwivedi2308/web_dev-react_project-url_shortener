import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button';
import { Copy, Delete, Download, Trash } from 'lucide-react';
import Usefetch from '@/hooks/Usefetch';
import { deleteUrl } from '@/db/apiUrls';
import { BeatLoader } from 'react-spinners';

const LinkCard = ({ url, fetchUrls }) => {
const downloadImage = async () => {
  try {
    const imageUrl = url?.qr
    const filename = url?.title || "qr-code"

    // Fetch the image as a blob
    const response = await fetch(imageUrl, { mode: "cors" })
    const blob = await response.blob()

    // Create a temporary object URL
    const objectUrl = URL.createObjectURL(blob)

    // Create a hidden <a> element
    const anchor = document.createElement("a")
    anchor.href = objectUrl
    anchor.download = `${filename}.png`   // force download as .png
    document.body.appendChild(anchor)

    // Trigger download
    anchor.click()

    // Cleanup
    document.body.removeChild(anchor)
    URL.revokeObjectURL(objectUrl)
  } catch (err) {
    console.error("Download failed:", err)
  }
}

const {loading:loadingDelete,fn:fnDelete}=Usefetch(deleteUrl,url?.id)
const baseLink=import.meta.env.VITE_BASE_URL
  return (
    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg'>
      <img src={url?.qr}
        className='h-32 object-contain ring ring-blue-500 self-start'
        alt="qr code" />

      <Link to={`/link/${url?.id}`} className='flex flex-col flex-1'>

        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}</span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          {baseLink}/{url?.custom_url ? url?.custom_url : url.short_url}</span>

        <span className="flex items-center gap-1 hover:underline cursor-pointer">{url?.original_url}</span>
        <span className="flex items-end font-extralight text-sm flex-1">{new Date(url?.created_at).toLocaleString()}</span>
      </Link>

      {/* buttons to download qr , copy the short url or delete the link */}
      <div className='flex gap-2 '>
        {/* copy button */}
        <Button variant='ghost'
          onClick={() => navigator.clipboard.writeText(`${baseLink}/${url?.short_url}`)}
        ><Copy /></Button>

        {/* download button */}
        <Button variant='ghost'
          onClick={downloadImage}
        ><Download /></Button>

        {/* delete button */}
        <Button variant='ghost'
        onClick={()=>fnDelete().then(()=>{fetchUrls()})}
        >{loadingDelete?<BeatLoader size={5} color='white'/> : <Trash />}</Button>
      </div>
    </div>
  )
}

export default LinkCard