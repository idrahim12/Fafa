const fs = require("fs-extra");
const path = require("path");

const allowedUID = "61574007381785";
const cacheDir = path.join(__dirname, "cache");
const pathFile = path.join(cacheDir, "autoseen.txt");

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

if (!fs.existsSync(pathFile)) {
  fs.writeFileSync(pathFile, "false");
}

module.exports = {
  config: {
    name: "autoseen",
    version: "1.0.1",
    author: "SHAHADAT SAHU",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "Auto seen messages"
    },
    longDescription: {
      en: "Automatically marks messages as seen"
    },
    category: "tools",
    guide: {
      en: "{pn} on / off"
    }
  },

  onChat: async function ({ api }) {
    try {
      const status = fs.readFileSync(pathFile, "utf-8").trim();

      if (status === "true") {
        api.markAsReadAll(() => {});
      }
    } catch (err) {
      console.error("AutoSeen onChat error:", err);
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      if (event.senderID !== allowedUID) {
        return message.reply("এই কমান্ড টা শুধু ইয়াকুব স্যার ব্যবহার করতে পারবে, তুমি ব্যবহার করতে চাইলে ইয়াকুব স্যারের কাছে পারমিশন নেও");
      }

      const option = args[0]?.toLowerCase();

      if (option === "on") {
        fs.writeFileSync(pathFile, "true");
        return message.reply("অটোসিন সফলভাবে চালু হয়েছে।");
      }

      if (option === "off") {
        fs.writeFileSync(pathFile, "false");
        return message.reply("অটোসিন সফলভাবে বন্ধ হয়েছে।");
      }

      return message.reply("ভুল ব্যবহার।\nব্যবহার করো: autoseen on / off");
    } catch (err) {
      console.error("AutoSeen onStart error:", err);
      return message.reply("কমান্ড চালাতে সমস্যা হয়েছে।");
    }
  }
};
