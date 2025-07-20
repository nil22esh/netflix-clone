import Like from "./../models/like.schema.js";

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const deleted = await Like.findOneAndDelete({ postId, userId });
    if (deleted) {
      return res.status(200).json({ success: true, message: "Post unliked" });
    }
    await Like.create({ postId, userId });
    return res.status(201).json({ success: true, message: "Post liked" });
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
