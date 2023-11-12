const { genSalt, hash, compare } = require("bcrypt");
const { Schema, default: mongoose, models, model } = require("mongoose");

const EmailVerificationTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: "24h",
  },
});

EmailVerificationTokenSchema.pre("save", async function (next) {
  if (!this.isModified("token")) {
    return next();
  }
  const salt = await genSalt(10);
  this.token = await hash(this.token, salt);
  next();
});

EmailVerificationTokenSchema.methods.compareToken = async function (
  tokenToCompare
) {
  try {
    return await compare(tokenToCompare, this.token);
  } catch (error) {
    throw error;
  }
};

const EmailVerificationToken =
  models.EmailVerificationToken ||
  model("EmailVerificationToken", EmailVerificationTokenSchema);

export default EmailVerificationToken;
