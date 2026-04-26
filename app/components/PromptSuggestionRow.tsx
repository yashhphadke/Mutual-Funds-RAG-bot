import PromptSuggestionButton from "./PromptSuggestionButton"

type PromptSuggestionRowProps = {
    onPromptClick: (prompt: string) => void
}

const PromptSuggestionRow = ({onPromptClick}:PromptSuggestionRowProps) =>{
    const prompts = [
        "Tell me the risk of HDFC-NIFTY-50-index-fund-direct-growth ",
        "What is the NAV of the HDFC Gold ETF Fund?",
        "Where can I reach out for assistance?",
        "Total AUM of HDFC AMC"
    ]
    return (    
        <div className="prompt_suggestion_row">
            {prompts.map((prompt,index)=>
            <PromptSuggestionButton 
            key={`suggestion-${index}`} 
            text={prompt} 
            onClick={()=>onPromptClick(prompt)}
            />)}
        </div>
    )
}

export default PromptSuggestionRow