import User from "./../models/user.schema.js";

export const toggleFollow = async (req, res) => {
  const userId = req.user.id;
  const { followingId } = req.body;
  try {
    if (userId === followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }
    const user = await User.findById(userId);
    const targetUser = await User.findById(followingId);
    if (!user || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isFollowing = user.following.includes(followingId);
    if (isFollowing) {
      user.following.pull(followingId);
      targetUser.followers.pull(userId);
    } else {
      user.following.push(followingId);
      targetUser.followers.push(userId);
    }
    await user.save();
    await targetUser.save();
    return res.status(200).json({
      message: isFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
    });
  } catch (error) {
    console.log(`Error at following user: ${error}`);
    return res.status(500).json({ message: "Error at following user" });
  }
};

export const getFollowers = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate(
      "followers",
      "username profilePic"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      count: user.followers.length,
      data: user.followers,
    });
  } catch (error) {
    console.error("Error fetching followers:", error);
    return res.status(500).json({ message: "Error fetching followers" });
  }
};

export const getFollowing = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate(
      "following",
      "username profilePic"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      count: user.following.length,
      data: user.following,
    });
  } catch (error) {
    console.error("Error fetching following:", error);
    return res.status(500).json({ message: "Error fetching following" });
  }
};
