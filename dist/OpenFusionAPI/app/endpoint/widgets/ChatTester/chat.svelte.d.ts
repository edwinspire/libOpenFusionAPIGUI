export default Chat;
type Chat = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Chat: import("svelte").Component<{
    class_content?: string;
    onmessage?: Function;
    currentChat?: Record<string, any>;
    messages?: any[];
}, {}, "class_content" | "currentChat" | "messages">;
type $$ComponentProps = {
    class_content?: string;
    onmessage?: Function;
    currentChat?: Record<string, any>;
    messages?: any[];
};
