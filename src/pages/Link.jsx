import { Button } from '@/components/ui/button';
import { UrlState } from '@/Context';
import { getClicksForURL } from '@/db/apiClicks';
import { deleteUrl, getUrl } from '@/db/apiUrls';
import Usefetch from '@/hooks/Usefetch';
import { Copy, Download, Link2, Trash } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { BarLoader, BeatLoader } from 'react-spinners';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LocationStats from '@/components/LocationStats';
import DeviceStats from '@/components/DeviceStats';
const Link = () => {


  const { id } = useParams()
  const { user } = UrlState()
  const navigate = useNavigate()
  const { loading, data: url, fn, error, } = Usefetch(getUrl, { id, user_id: user?.id })

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
  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = Usefetch(getClicksForURL, id)

  // to delete the url
  const { loading: loadingDelete, fn: fnDelete } = Usefetch(deleteUrl, id)

  useEffect(() => {
    fn()
    fnStats()
  }, [])

  if (error) {
    navigate('/dashboard')
  }
  let link = ''
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  // get base url from dotenv for dynamic link generation 
  const baseUrl = import.meta.env.VITE_BASE_URL

  return <>
    {(loading || loadingStats) && (<BarLoader className='mb-4' width={'100%'} color='#36d7b7' />)}
    <div className='flex flex-col gap-8 sm:flex-row justify-between'>
      {/* div for left side  */}
      <div className='flex flex-col items-start gap-8 rounded-lg sm:w-2/5'>
        <span className='text-6xl font-extrabold hover:underline cursor-pointer'>
          {url?.title}</span>

        {/* your shortened link */}
        <a
          href={`${baseUrl}/${link}`}
          target='_blank'
          className='text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer'
        >
          {baseUrl}/{link}
        </a>

        {/* your original url */}
        <a
          href={url?.original_url}
          target='_blank'
          className='flex items-center gap-1 hover:underline cursor-pointer'
        >
          <Link2 className='p-1' />
          {url?.original_url}
        </a>

        {/* created at field of your url */}
        <span className='flex items-end font-extralight text-sm'>
          {new Date(url?.created_at).toLocaleString()}</span>
        {/* buttons to download qr , copy the short url or delete the link */}
        <div className='flex gap-2 '>
          {/* copy button */}
          <Button variant='ghost'
            onClick={() => navigator.clipboard.writeText(`${url?.short_url}`)}
          ><Copy /></Button>

          {/* download button */}
          <Button variant='ghost'
            onClick={downloadImage}
          ><Download /></Button>

          {/* delete button */}
          <Button variant='ghost'
            onClick={() => fnDelete()}
          >{loadingDelete ? <BeatLoader size={5} color='white' /> : <Trash />}</Button>
        </div>
        <img src={url?.qr}
          className='w-50 self-center sm:self-start ring ring-blue-500 p-1 object-contain'
          alt="qr code" />
      </div>

      {/* div for right side  */}
      <div ></div>

      <Card className='sm:w-3/5'>
        <CardHeader>
          <CardTitle className='text-4xl font-extrabold'>Stats for {url?.title}</CardTitle>
        </CardHeader>

        {stats && stats?.length ?
          (<CardContent className='flex flex-col gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>Total Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{stats?.length}</p>
              </CardContent>
            </Card>
            <CardTitle>Location Data</CardTitle>
            {/* loaction component here  */}
            <LocationStats stats={stats}/>
            <CardTitle>Device Info</CardTitle>
            {/* device stats here  */}
            <DeviceStats stats={stats}/>

          </CardContent>) :
          (<CardContent>
            {loadingStats === false ? 'No Stats Yet' : 'Loading Stats...'}
          </CardContent>)}

      </Card>
    </div>
  </>
};

export default Link;
