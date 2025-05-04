import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    enabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    message: {
      type: String,
      default: "Situs sedang dalam perawatan. Kami akan kembali secepatnya.",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "maintenance" }
);

maintenanceSchema.pre("save", async function (next) {
  const count = await this.constructor.countDocuments();
  if (count >= 1 && this.isNew) {
    throw new Error("Hanya boleh ada satu konfigurasi maintenance.");
  }
  next();
});

export default mongoose.models.Maintenance ||
  mongoose.model("Maintenance", maintenanceSchema);
