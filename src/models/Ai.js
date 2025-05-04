import mongoose from "mongoose";

const aiSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    contentBlockId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    query: {
      type: String,
      required: true,
      trim: true,
    },
    response: {
      type: String,
      required: true,
      trim: true,
    },
    feedbackType: {
      type: String,
      enum: ["debugging", "feedback"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

aiSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Ai = mongoose.model("Ai", aiSchema);

export default Ai;
