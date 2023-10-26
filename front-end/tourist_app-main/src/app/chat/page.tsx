'use client'
import Image from 'next/image';
import { useState, type FC, useEffect } from 'react';
// import { useRouter } from 'next/router';

interface chatProps { }
interface LocationData {
    name: string,
    cityState: string,
    imageUrl: string,
    ranking: string,
    webUrl: string
}
const dummy: LocationData = {
    name: "",
    cityState: "",
    imageUrl: "",
    ranking: "",
    webUrl: ""

}
const Chat: FC<chatProps> = ({ }) => {

    const [placeData, setPlaceData] = useState<LocationData>(dummy)
    const [inputText, setInputText] = useState("")
    const [isPlaceLoaded, setPlaceLoaded] = useState(false)
    const [userMsg, setUserMsg] = useState("")
    const [messages, setMessages] = useState([


        {
            sender: "user",
            message: "Tell me the history of this place"
        },
    ]);

    useEffect(() => {
        const dataString = localStorage.getItem('placeData')

        if (dataString) {
            const data: LocationData = JSON.parse(dataString)

            setPlaceData(data)

        }
        setPlaceLoaded(true)
    }, [])

    useEffect(() => {
        const storedMessage = localStorage.getItem('message');
        if (storedMessage) {
            const retrievedMessage = JSON.parse(storedMessage)
            setMessages(retrievedMessage);
        }

    }, [])

    const AI_init = <div className="flex items-center">
        <span className='mr-1  px-2 py-1 rounded-full'>AI:</span>
        <div className="flex flex-col w-full py-4 px-4 bg-slate-800 rounded-md space-y-2">
            <h3 className='text-xl font-bold'>Your chosen place of visit is: </h3>
            <p>{placeData.name + ", " + placeData.cityState + "."}</p>

            {placeData.imageUrl && <div className="mx-auto">
                <img src={placeData.imageUrl} width={250} height={250} alt={placeData.name} />
            </div>}
            <p>This place is ranked {placeData.ranking} </p>
        </div>


    </div>
    let chatAIMsg = ""
    let getInput = (e: any) => {
        const { value } = e.target
        setInputText(value)
    }
    let onSendChat = () => {
        const newMessage = {
            sender: "user",
            message: inputText,
        };


        setMessages((prevList) =>
            [...prevList, newMessage]

        )
        // Save the updated state to localStorage
        localStorage.setItem('message', JSON.stringify([...messages, newMessage]));

        setInputText("")
    }
    let display = messages.map((message, index) => {
        if (message.sender == 'user') {
            return (
                <div key={index} className="flex items-center flex-row-reverse">
                    <div className="flex  items-center py-4 px-2">
                        <p>{message.message} </p>
                    </div>
                </div>
            )
        } else {
            return (

                <div key={index} className="flex items-center">
                    <span className='mr-1  px-2 py-1 rounded-full'>AI:</span>
                    <div className="flex w-full py-4 px-2 bg-slate-800 rounded-md">
                        <p>{message.message}</p>
                    </div>
                </div>
            )
        }
    })
    // The flash screen before the fetch result appears
    const LoadingChatView = () => {
        return (
            <div className="flex justify-center items-center">
                Loading chat...
            </div>
        )
    }
    const LoadedChatView = () => {
        return (
            <div>
                {AI_init}
                {display}
            </div>
        )
    }
    return (
        <div>
            <div className="bg-gray-700 p-4">
                <h1 className='text-center'>Chat page</h1>
            </div>

            <div className="chat p-2">
                {!isPlaceLoaded ? LoadingChatView() : LoadedChatView()}
            </div>


            <div className="bottom-0 fixed w-full flex border-t-2 p-2 border-gray-600">
                <input className='p-4 bg-black w-[80%] mr-1 border-2 border-gray-600 ' type="text" onChange={getInput} value={inputText} />
                <input className='p-4 border-2 w-[20%] border-gray-600 bg-gray-700 rounded-md' onClick={onSendChat} type='button' value="Send" />
            </div>

        </div>
    );
}
export default Chat;