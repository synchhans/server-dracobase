const recentlyDeletedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deletedItem: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

recentlyDeletedSchema.pre("save", function (next) {
  this.deletedAt = Date.now();
  next();
});

const RecentlyDeleted = mongoose.model(
  "RecentlyDeleted",
  recentlyDeletedSchema
);

export default RecentlyDeleted;
