import crypto from "crypto";

// bcrypt password
const cryptoPassword = async (password: string) => {
  const data = {
    algorithm: "aes-256-cbc",
    key: crypto.randomBytes(32),
    iv: crypto.randomBytes(16),
  };
  const cipher = crypto.createCipheriv(data.algorithm, data.key, data.iv);
  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  let encryptedPassword = encrypted.toString("hex");
  return encryptedPassword;
};

export default { cryptoPassword };
