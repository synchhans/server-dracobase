import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    googleEmail: {
      type: String,
      unique: true,
      sparse: true,
    },
    googleDisplayName: String,
    googleFirstName: String,
    googleLastName: String,
    googlePicture: String,

    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    githubEmail: {
      type: String,
      unique: true,
      sparse: true,
    },
    githubDisplayName: String,
    githubUsername: String,
    githubPicture: String,

    email: {
      type: String,
      required: false,
      unique: true,
    },
    displayName: String,
    firstName: String,
    lastName: String,
    picture: String,

    role: {
      type: String,
      enum: ["frontend", "backend", "fullstack"],
    },
    plan: {
      type: String,
      enum: ["work", "personal", "education"],
    },

    isProfileComplete: { type: Boolean, default: false },

    level: {
      type: String,
      enum: ["user", "admin", "pengamat", "dosen"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "nonactive"],
      default: "active",
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

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
