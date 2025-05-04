import mongoose from "mongoose";

const recentSchema = new mongoose.Schema(
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
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    accessedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

recentSchema.pre("save", function (next) {
  this.accessedAt = Date.now();
  next();
});

const Recent = mongoose.model("Recent", recentSchema);

export default Recent;