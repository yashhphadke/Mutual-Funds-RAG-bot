"use client"
import Image from "next/image"
import logo from "./assets/grow.png"
import { useChat } from "ai/react"
import {Message} from "ai"
import Bubble from "./components/Bubble"
import LoadingBubble from "./components/LoadingBubble"
import PromptSuggestionRow from "./components/PromptSuggestionRow"

const Home = () =>{
    const {append,isLoading,messages,input,handleInputChange,handleSubmit} = useChat()
    const Nomessage = !messages || messages.length==0
    const handlePrompt = (promptText:string) =>{
        const msg:Message = {
            id:crypto.randomUUID(),
            content:promptText,
            role:"user"
        }
        append(msg)
    }
    return(
        <main>
            <Image src={logo} width="250" alt="logo"/>
            <section className={Nomessage?"":"populated"}>
                {
                    Nomessage?
                    (
                    <>
                     <p className="starter-text">
                        I do public facts, not personal finance—ask me what’s known, not what to buy.                    
                    </p>
                    <br/>
                    <PromptSuggestionRow onPromptClick={handlePrompt}/>
                    </>
                )
                    :(
                        <>
                            {messages.map((message, index) => (
                                <Bubble key={`message-${index}`} message={message} />
                            ))}
                            {isLoading && <LoadingBubble />}
                        </>
                    )
                }
            </section>
            <form onSubmit={handleSubmit}>
                    <input className="question-box" onChange={handleInputChange} value={input} placeholder="Ask me some questions"/>
                    <input type="submit"/>
                </form>
        </main>
    )
}

export default Home