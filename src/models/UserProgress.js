import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    activeMaterialIndex: {
      type: Number,
      default: 0,
    },
    completedMaterialIndexes: {
      type: [Number],
      default: [],
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userProgressSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

export default UserProgress;