import User from "../model/user.model.js";
import Message from "../model/message.model.js";
export const getUsersForSidebar = async (req, res) => {

    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        res.status(200).json({ filteredUsers });
    } catch (err) {
        console.log(err) + "error in getUsersForSidebar";
        res.status(500).json({ message: err.message })
    }
}

export const getMessages = async (req, res) => {
    try {

        const { id: userToChatID } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatID },
                { sender: userToChatID, receiver: myId }
            ]
            //find all messages sender and user between both users
        })

        res.status(200).json({ messages });

    }
    catch (err) {
        console.log(err) + "error in getMessages";
        res.status(500).json({ message: err.message })
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;

        let imaageUrl
        //if user wants to send images then it wil save to cloudinary
        if (image) {

            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();


        //real time functionality to send message to receiver soket.io

        res.status(200).json({ newMessage });

    }
    catch (err) {
        console.log(err) + "error in sendMessage";
        res.status(500).json({ message: err.message })
    }

}