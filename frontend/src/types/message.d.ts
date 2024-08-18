interface Message {
    userId: string;
    text?: string;
    contentType? : 'text' | 'image' | 'video';
    status? : 'read' | 'unread' | 'sent';
}

export default Message;