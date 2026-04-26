type PromptSuggestionButtonProps = {
    text: string
    onClick: () => void
}

const PromptSuggestionButton = ({ text, onClick }: PromptSuggestionButtonProps) => {
    return (
        <button
            className="prompt_suggestion_button"
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default PromptSuggestionButton