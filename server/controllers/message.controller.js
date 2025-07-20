import Message, { Chat } from "../models/message.schema.js";

export const sendMessage = async (req, res) => {
  try {
    const { chatId, message, media } = req.body;
    const senderId = req.user.id;
    if (!chatId || !senderId || (!message && !media)) {
      return res.status(400).json({
        success: false,
        message: "Chat ID, sender, and message/media are required",
      });
    }
    const newMessage = new Message({
      chatId,
      senderId,
      message,
      media,
    });
    await newMessage.save();
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: newMessage._id,
      updatedAt: Date.now(),
    });
    const populatedMessage = await Message.findById(newMessage._id).populate(
      "senderId",
      "username profilePic"
    );
    return res.status(201).json({
      success: true,
      data: populatedMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId })
      .populate("senderId", "username profilePic")
      .sort({ createdAt: 1 });
    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};
