import mongoose from "mongoose";

const { Schema } = mongoose;

const UserTutorialSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    hasCompletedTutorial: {
      type: Boolean,
      default: false,
    },
    lastViewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserTutorial =
  mongoose.models.UserTutorial ||
  mongoose.model("UserTutorial", UserTutorialSchema);

export default UserTutorial;
