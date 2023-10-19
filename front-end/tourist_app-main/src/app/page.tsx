'use client'
import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  interface LocationData {
    name: string;
    location_string: string;
    photo: any;
  }


  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  // const []
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState<LocationData[]>([]);

  const [bl_lat, setBl_lat] = useState("");
  const [bl_lng, setBl_lng] = useState("");
  const [tr_lat, setTr_lat] = useState("");
  const [tr_lng, setTr_lng] = useState("");


  let getLocationData = async (bl_lat: string, bl_lng: string, tr_lat: string, tr_lng: string, type: string) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "21213a78ddmshd3fbadf293e12d8p181de5jsnde4e4df0843d",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    await fetch(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${bl_lat}&tr_latitude=${tr_lat}&bl_longitude=${bl_lng}&tr_longitude=${tr_lng}&limit=30&currency=USD&open_now=false&lunit=mi&lang=en_US`,
      options
    )
      .then((response) => response.json())
      .then(({ data }: { data: LocationData[] }) => {

        console.log(data)
        setMainData(data);
        setTimeout(() => {
          setIsLoading(false);

        }, 1000);
        // console.log(data[0].photo.images.thumbnail);
      })
      .catch((err) => console.error(err));

    // const first = mainData[0]
    console.log("first");
  };


  const getLocation = (e: any) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude })

          // Calculate the bounding box coordinates
          const delta = 0.01;
          const bl_latitude = latitude - delta;
          const bl_longitude = longitude - delta;
          const tr_latitude = latitude + delta;
          const tr_longitude = longitude + delta;

          setBl_lat(bl_latitude.toString())
          setBl_lng(bl_longitude.toString())
          setTr_lat(tr_latitude.toString())
          setTr_lng(tr_longitude.toString())

          // getLocationData(bl_lat, bl_lng, tr_lat, tr_lng, "attractions")
          getLocationData(bl_latitude.toString(), bl_longitude.toString(), tr_latitude.toString(), tr_longitude.toString(), "attractions")
          // console.log(bl_latitude.toString(), bl_longitude.toString(), tr_latitude.toString(), tr_longitude.toString(), "attractions")
        },
        (error) => {
          console.error('Getting location error: ', error);

        }
      );
    } else {
      console.error('Getting location is not supported on your browser');
    }
  }
  useEffect(() => {
    getLocation(event)
  }, [])


  return (
    <div className='p-6'>
      {location && (
        <div className='flex space-x-4 justify-center'>
          <p>Lat: {location.latitude}</p>
          <p>Long: {location.longitude}</p>

        </div>
      )}
      <div className="grid grid-cols-12">
        {mainData?.map((data, index) => {
          if (typeof data.location_string != "undefined") {
            const imageUrl = data?.photo?.images?.original?.url;
            return (
              <Link className='md:col-span-4 col-span-12 pb-2 h-[300px] mb-3 !rounded-t-md overflow-hidden' key={index} href={{ pathname: "/chat", query: { data: JSON.stringify({ name: data?.name, location: data?.location_string }) } }} >
                <div
                  className=' bg-slate-800 rounded-md h-full rounded-t-md'
                >
                  {imageUrl ? (<img src={imageUrl} alt={data?.name} width={150} height={150} className='w-full h-[210px] rounded-t-md' />) : (<img src={"/assets/no-image.png"} alt={data?.name} width={150} height={150} className='w-full h-[210px] rounded-t-md' />)}
                  <div className="px-4 flex flex-col justify-center items-center h-[90px]">
                    <h1 className='text-center'>{data?.name}</h1>
                    <h1 className='text-center text-slate-400'>location: {data?.location_string}</h1>
                  </div>
                </div>
              </Link>

            );
          }


        })}
      </div>


    </div>
  );
}
