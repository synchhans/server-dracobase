import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    materials: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        title: {
          type: String,
          required: true,
        },
        contentBlocks: [
          {
            type: {
              type: String,
              enum: ["text", "code", "commands", "terminal", "image", "video"], 
              required: true,
            },
            content: {
              type: mongoose.Schema.Types.Mixed,
              required: true,
            },
            order: {
              type: Number,
              required: true,
            },
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    published: {
      type: Boolean,
      default: false,
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

languageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Language = mongoose.model("Language", languageSchema);

export default Language;
