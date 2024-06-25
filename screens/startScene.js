import { truncateEthAddress } from "../helpers/truncateEthAddress.js";
import { readUserData, writeUserData } from "../index.js";

function startScene(scene) {
  const userData = readUserData();

  scene.enter(async (ctx) => {
    const user = userData.users[ctx.from.id] || { tokens: [{}] };

    ctx.reply(
      `🚀 Welcome to BULKS BOT AI Bundler Bot! 🚀\n\nPlease provide the following information to get started:\n\n${
        user.tokens[0].deployerKey ? "✅" : "📦"
      } <b>Deployer Wallet: ${
        user.tokens[0].deployerKey ? "Provided" : ""
      }</b> \n${user.tokens[0].buyerKey ? "✅" : "📦"} <b>Buyer Wallet: ${
        user.tokens[0].buyerKey ? "Provided" : ""
      }</b> \n\n${user.tokens[0].market ? "✅" : "📦"} <b>Market ID: ${
        user.tokens[0].market
          ? truncateEthAddress(String(user.tokens[0].market))
          : ""
      }</b> \n${user.tokens[0].baseToken ? "✅" : "📦"} <b>Base Token: ${
        user.tokens[0].baseToken
          ? truncateEthAddress(String(user.tokens[0].baseToken))
          : ""
      }</b>  \n${user.tokens[0].quoteToken ? "✅" : "📦"} <b>Quote Token: ${
        user.tokens[0].quoteToken
          ? truncateEthAddress(String(user.tokens[0].quoteToken))
          : ""
      }</b>  \n${
        user.tokens[0].baseTokenLiquidity ? "✅" : "📦"
      } <b>Initial Base Token Liquidity: ${
        user.tokens[0].baseTokenLiquidity
          ? user.tokens[0].baseTokenLiquidity
          : ""
      }</b> \n${
        user.tokens[0].quoteTokenLiquidity ? "✅" : "📦"
      } <b>Initial Quote Token Liquidity: ${
        user.tokens[0].quoteTokenLiquidity
          ? user.tokens[0].quoteTokenLiquidity
          : ""
      }</b> \n${user.tokens[0].buySnipe ? "✅" : "📦"} <b>Token to Buy/Snipe: ${
        user.tokens[0].buySnipe
          ? truncateEthAddress(String(user.tokens[0].buySnipe))
          : ""
      }</b>  \n${user.tokens[0].buy ? "✅" : "📦"} <b>Buy Amount: ${
        user.tokens[0].buy ? user.tokens[0].buy : ""
      }</b>`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "➕ Deployer Wallet", callback_data: "deployer" },
              { text: "➕ Buyer Wallet", callback_data: "buyer" },
            ],
            [{ text: "➕ Market ID", callback_data: "market" }],
            [
              {
                text: "➕ Initial Base Token Liquidity",
                callback_data: "basetoken",
              },
              {
                text: "➕ Initial Quote Token Liquidity",
                callback_data: "quotetoken",
              },
            ],
            [{ text: "➕ Token to Buy/Snipe", callback_data: "buysnipe" }],
            [{ text: "➕ Buy Amount", callback_data: "buyamt" }],
            [
              { text: "🔄 Reset", callback_data: "reset" },
              { text: "➡️ Next", callback_data: "next" },
            ],
          ],
        },
        parse_mode: "HTML",
      }
    );
  });

  scene.action("buyer", (ctx) => {
    ctx.scene.enter("buyerScene");
  });
  scene.action("deployer", (ctx) => {
    ctx.scene.enter("deployerScene");
  });
  scene.action("market", (ctx) => {
    ctx.scene.enter("marketScene");
  });
  scene.action("basetoken", (ctx) => {
    ctx.scene.enter("baseTokenScene");
  });
  scene.action("quotetoken", (ctx) => {
    ctx.scene.enter("quoteTokenScene");
  });
  scene.action("buysnipe", (ctx) => {
    ctx.scene.enter("buysnipeScene");
  });
  scene.action("buyamt", (ctx) => {
    ctx.scene.enter("buyScene");
  });

  scene.action("reset", (ctx) => {
    const userContext = ctx.from.id;
    userData.users[userContext].tokens = [{}];
    writeUserData(userData);
    ctx.reply("All fields have been reset. Please provide the required information again.");
    ctx.scene.reenter();
  });

  scene.action("next", (ctx) => {
    const userContext = ctx.from.id;
    const user = userData.users[userContext];

    if (
      user.tokens[0].deployerKey &&
      user.tokens[0].buyerKey &&
      user.tokens[0].market &&
      user.tokens[0].baseToken &&
      user.tokens[0].quoteToken &&
      user.tokens[0].baseTokenLiquidity &&
      user.tokens[0].quoteTokenLiquidity &&
      user.tokens[0].buySnipe &&
      user.tokens[0].buy
    ) {
      ctx.scene.enter("nextScene");
    } else {
      ctx.reply("Please provide all the required information.");
    }
  });
}

export default startScene;
