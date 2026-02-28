module.exports.config = {
 name: "autoreact",
 version: "1.1.1",
 hasPermission: 0,
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "Bot React",
 commandCategory: "No Prefix",
 cooldowns: 0,
};

const allowedUID = "61574007381785";

module.exports.handleEvent = async ({ api, event }) => {
 const threadData = global.data.threadData.get(event.threadID) || {};
 if (threadData["🥰"] === false) return; // Auto-react off

 const emojis = ["🥰", "😗", "🍂", "💜", "☺️", "🖤", "🤗", "😇", "🌺", "🥹", "😻", "😘", "🫣", "😽", "😺", "👀", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🤍", "💫", "💦", "🫶", "🫦", "👄", "🗣️", "💏", "👨‍👩‍👦‍👦", "👨‍👨‍👦", "😵", "🥵", "🥶", "🤨", "🤐", "🫡", "🤔"];
 const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

 api.setMessageReaction(randomEmoji, event.messageID, (err) => {
  if (err) console.error("Error sending reaction:", err);
 }, true);
};

module.exports.run = async ({ api, event, Threads }) => {

 const { threadID, messageID, senderID } = event;

 // 🔒 শুধু তোমার জন্য পারমিশন
 if (senderID !== allowedUID) {
  return api.sendMessage(
   "এই কমান্ড টা শুধু ইয়াকুব স্যার ব্যবহার করতে পারবে, তুমি  ব্যবহার করতে চাইলে ইয়াকুব স্যারের কাছে পারমিশন নেও",
   threadID,
   messageID
  );
 }

 const threadData = await Threads.getData(threadID);

 if (typeof threadData.data["🥰"] === "undefined") {
  threadData.data["🥰"] = true;
 } else {
  threadData.data["🥰"] = !threadData.data["🥰"];
 }

 await Threads.setData(threadID, { data: threadData.data });
 global.data.threadData.set(threadID, threadData.data);

 api.sendMessage(
  `Auto-react is now ${threadData.data["🥰"] ? "ON 🟢" : "OFF 🔴"}`,
  threadID,
  messageID
 );
};
