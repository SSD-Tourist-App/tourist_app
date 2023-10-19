'use client'
import { useState, type FC } from 'react';

interface LocateProps { }

const Locate: FC<LocateProps> = ({ }) => {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const getLocation = (e: any) => {
        e.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude })
                },
                (error) => {
                    console.error('Getting location error: ', error);

                }
            );
        } else {
            console.error('Getting location is not supported on your browser');
        }
    }
    return (
        <div>
            <button onClick={getLocation}>Get My Locatio</button>
            {location && (
                <div>
                    Latitude: {location.latitude}
                    <br />
                    Longitude: {location.longitude}
                </div>
            )}

        </div>
    );
}
export default Locate;