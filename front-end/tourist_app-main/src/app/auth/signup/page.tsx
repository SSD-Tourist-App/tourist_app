'use client'
import { GoogleIcon } from '@/app/component/Svg';
import Link from 'next/link';
import { useState, type FC } from 'react';

interface pageProps { }

interface IUserData {
    firstName: string;
    email: string;
    password: string;
}

const page: FC<pageProps> = ({ }) => {
    const [userData, setUserData] = useState<IUserData>({
        firstName: "",
        email: "",
        password: ""
    })
    let updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
        let field = e.target.name;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [field]: e.target.value,
        }));



    }

    let submitForm = (e: any) => {
        fetch("https://touristapp-3c2732a22dfa.herokuapp.com/api/signup/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response not okay")
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.error("Fetch Error: ", error);
            })
        console.log("data sent: " + userData);
    }
    return (
        <div className='px-2 py-[80px] kbg-[#111926]  flex flex-col justify-center' >
            <div className="h-[40px] flex items-center mb-4">
                <h1 className='font-bold text-3xl'>Create account</h1>

            </div>
            <div className="">
                <button type="button" className='bg-transparent  h-[47px] w-full border-[1px] rounded-[8px] border-white flex justify-center items-center space-x-3'><GoogleIcon /> <p>Sign  with Google</p></button>
            </div>

            <div className="">
                <div className="flex items-center justify-center mt-6">
                    <span className='border-b-[1px] w-[153px]'></span><span className='flex items-end mx-2'>OR</span ><span className='border-b-[1px] w-[153px]'></span>
                </div>
                <div className="space-y-[20px] my-[28px]">
                    <div className="flex flex-col space-y-2 p-1">
                        <label>First name <sup className='text-red-600'>*</sup></label>
                        <input type="text" placeholder='Enter your first name' onChange={updateData} value={userData.firstName} name="firstName" className='h-[48px] bg-transparent border-[1px] rounded-[8px] border-white placeholder:px-2 placeholder:text-[13px] placeholder:text-[rgba(255, 255, 255, 0.50)]' />
                    </div>
                    <div className="flex flex-col space-y-2 p-1">
                        <label>Email <sup className='text-red-600'>*</sup></label>
                        <input type="text" placeholder='Enter your email' onChange={updateData} value={userData.email} name="email" className='h-[48px] bg-transparent border-[1px] rounded-[8px] border-white placeholder:px-2 placeholder:text-[13px] placeholder:text-[rgba(255, 255, 255, 0.50)]' />
                    </div>
                    <div className="flex flex-col space-y-2 p-1">
                        <label>Password <sup className='text-red-600'>*</sup></label>
                        <input type="password" minLength={8} placeholder='Enter your Password' onChange={updateData} name="password" value={userData.password} className='h-[48px] bg-transparent border-[1px] rounded-[8px] border-white placeholder:px-2 placeholder:text-[13px] placeholder:text-[rgba(255, 255, 255, 0.50)]' />
                        <p className=' text-[10px] mx-2'>Must be at least 8 characters</p>
                    </div>

                </div>



                <div className="space-y-1 mt-[30px]">
                    <div className="">
                        <button type="button" className='bg-white text-black h-[47px] w-full rounded-[8px]' onClick={submitForm}>Create account</button>
                    </div>
                    <p className=' text-[10px] mx-2 text-center'>Already have an account? <Link href={"/auth/signin"}>Log in</Link></p>
                </div>
            </div>
        </div>
    );
}
export default page;