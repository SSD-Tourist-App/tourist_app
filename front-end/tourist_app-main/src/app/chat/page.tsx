'use client'
import { useState, type FC, useEffect } from 'react';
// import { useRouter } from 'next/router';

interface chatProps { }
const Chat: FC<chatProps> = ({ }) => {
    // const router = useRouter();
    // const { data } = router.query;
    // const parsedData = JSON.parse(data || {});


    const [inputText, setInputText] = useState("")
    const [userMsg, setUserMsg] = useState("")
    const [messages, setMessages] = useState([

        {
            sender: "ai",
            message: "Hello, you are currently here "
        },
        {
            sender: "user",
            message: "Tell me the history of this place"
        },
    ]);


    useEffect(() => {
        const storedMessage = localStorage.getItem('message');
        if (storedMessage) {
            const retrievedMessage = JSON.parse(storedMessage)
            setMessages(retrievedMessage);
        }
        
    }, [])


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
    return (
        <div>
            <div className="bg-gray-700 p-4">
                <h1 className='text-center'>Chat page</h1>
            </div>

            <div className="chat p-2">

                {display}
            </div>


            <div className="bottom-0 fixed w-full flex border-t-2 p-2 border-gray-600">
                <input className='p-4 bg-black w-[80%] mr-1 border-2 border-gray-600 ' type="text" onChange={getInput} value={inputText} />
                <input className='p-4 border-2 w-[20%] border-gray-600 bg-gray-700 rounded-md' onClick={onSendChat} type='button' value="Send" />
            </div>

        </div>
    );
}
export default Chat;