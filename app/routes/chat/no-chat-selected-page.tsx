import { MessageCircle } from "lucide-react";

const NoChatSelectedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-muted/5">
        <div className="h-24 w-24 rounded-full bg-muted/20 flex items-center justify-center mb-6">
            <MessageCircle className="text-muted-foreground w-8 h-8" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No Chat Selected</h2>
        <p className="text-muted-foreground max-w-md mb-6">
            Select a contact from the sidebar to start a conversation or continue where you left off.
        </p>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Start New Chat
            </button>
        </div>
    </div>
  )
}

export default NoChatSelectedPage;