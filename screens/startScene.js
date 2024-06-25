function startScene(scene) {
  scene.enter((ctx) => {
    ctx.reply(
      "🚀 Welcome to BulkSai Bundler Bot! 🚀\n\nPlease provide the following information to get started:\n\n❔ <b>Deployer Wallet:</b>\n❔ <b>Buyer Wallet:</b>\n❔ <b>Market ID:</b>\n❔ <b>Base Token:</b>\n❔ <b>Quote Token:</b>\n❔ <b>Initial Base Token Liquidity:</b>\n❔ <b>Initial Quote Token Liquidity:</b>\n❔ <b>Token to Buy/Snipe:</b>\n❔ <b>Buy Amount:</b>\n\nChoose an option below to proceed:",
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
    ctx.scene.enter("resetScene");
  });
  scene.action("next", (ctx) => {
    ctx.scene.enter("nextScene");
  });
}

export default startScene;
