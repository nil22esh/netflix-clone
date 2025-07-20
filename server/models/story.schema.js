import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => typeof v === "string" && v.length > 0,
        message: "Story must have a valid media URL",
      },
    },
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
