import isValidPrivateKey from "../../hooks/isValidPrivateKey.js";
import { readUserData, writeUserData } from "../../index.js";

export const quoteTokenScene = (scene) => {
  scene.enter((ctx) => {
    ctx
      .reply("Please enter the initial quote token liquidity.", {
        reply_markup: {
          force_reply: true,
        },
      })
      .then((sentMessage) => {
        ctx.session.lastMessageId = sentMessage.message_id;
      });
  });

  scene.on("text", (ctx) => {
    const input = ctx.message.text;
    if (String(input) === "/start") {
      ctx.scene.enter("start");
    } else {
      // Replace this with your input validation logic
      const isPrivateKey = isValidPrivateKey(input.toString());

      if (isPrivateKey) {
        const userId = ctx.from.id;
        const userData = readUserData();
        if (!userData.users[userId]) {
          userData.users[userId] = { tokens: [] };
        }

        if (userData.users[userId].tokens.length > 0) {
          userData.users[userId].tokens[0].quoteToken = String(input);
        } else {
          userData.users[userId].tokens.push({ quoteToken: String(input) });
        }
        writeUserData(userData);
        ctx.reply("Input saved", {
          reply_to_message_id: ctx.session.lastMessageId,
        });
        // Add any further processes here
        ctx.scene.leave();
      } else {
        ctx
          .reply(
            "Only integers are allowed as initial quote token liquidity!.",
            {
              reply_to_message_id: ctx.session.lastMessageId,
            }
          )
          .then((sentMessage) => {
            ctx.session.lastMessageId = sentMessage.message_id;
          });
      }
    }
  });
};