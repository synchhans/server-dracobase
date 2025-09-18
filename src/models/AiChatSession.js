import mongoose from "mongoose";

const AiChatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("AiChatSession", AiChatSessionSchema);
