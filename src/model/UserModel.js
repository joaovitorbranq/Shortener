import mongoose from "mongoose";
import crypto from "crypto";


// Usar Model do mongoose para usuário:

// Name, Email, Role: Administrator / User, Password, Created At, Modified At, Phones: 123, 123

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    phones: [String],
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
