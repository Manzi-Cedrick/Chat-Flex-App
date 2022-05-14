export const isSameSender = (message,m,i,userId) => {
    return (
        i < message.length - 1 &&
        (message[i + 1].sender._id !== m.sender._id || message[i + 1].sender._id === undefined) && message[i].sender._id != userId
    );
}
export const isLastMessage = (message,i,userId) => {
    return (
        i === message.length - 1 && message[message.length - 1].sender._id !== userId && message[i].sender._id
    )
}