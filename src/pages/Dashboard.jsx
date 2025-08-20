import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getUrls } from '@/db/apiUrls';
import { UrlState } from '@/Context';
import { getClicksforUrrls } from '@/db/apiClicks';
import LinkCard from '@/components/LinkCard';
import { CreateLink } from '@/components/CreateLink';
import Usefetch from '@/hooks/Usefetch';
const Dashboard = () => {

  const [searchQuery, setsearchQuery] = useState('')
  const { user } = UrlState()
  
  
  const { loading, error, data: urls, fn: fnUrls } = Usefetch(getUrls, user?.id)
  
  
  const { loading: loadingClicks, data: clicks, fn: fnClicks } = Usefetch(getClicksforUrrls, urls?.map((url) => url.id))

  useEffect(() => {
    fnUrls()
  }, [])

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  

  return <div className='flex flex-col gap-8 '>
    <div >{loading || loadingClicks && <BarLoader width={'100%'} color="#36d7b7" />}</div>
    <div className='grid grid-cols-2 gap-4'>      
      <Card>
        <CardHeader>
          <CardTitle>Links Created</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{urls?.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{clicks?.length}</p>
        </CardContent>
      </Card>
    </div>
    <div className='flex justify-between'>
      <h1 className='text-4xl font-extrabold'>My Links</h1>
      <CreateLink/>
    </div>
    <div className='relative'>
      <Input
        type='text'
        placeholder='Filter Links'
        value={searchQuery}
        onChange={e => setsearchQuery(e.target.value)}
      />
      <Filter className='absolute top-2 right-2 p-1' />
    </div>
    {error && <Error message={error?.message}/>}
    {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
  </div>;
};

export default Dashboard;
