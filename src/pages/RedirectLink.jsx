import { storeClicks } from '@/db/apiClicks';
import { getLongUrl } from '@/db/apiUrls';
import Usefetch from '@/hooks/Usefetch';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { BarLoader } from 'react-spinners';

const RedirectLink = () => {

  const { id } = useParams()
  console.log(id);
  
  const { loading, data, fn } = Usefetch(getLongUrl, id)
  console.log(data);
  
  const { loading: loadingStats, fn: fnStats } = Usefetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  })

  useEffect(() => {
    fn()
  }, [])

  useEffect(() => {
    if (!loading && data) {
      fnStats()
    }
  }, [loading])

  if (loading && loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color='#36d7b7' />
        <br />
        Redirecting...
      </>
    )

  }

  return null
};

export default RedirectLink;
