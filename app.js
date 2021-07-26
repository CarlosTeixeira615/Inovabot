const { App } = require("@slack/bolt");
const { WebClient, LogLevel } = require("@slack/web-api");
const testemodel = require("./server/testemodel");
const fetch = require("node-fetch");
require("dotenv").config();

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SECRET,
});

// Listener middleware that filters out messages with 'bot_message' subtype
async function noBotMessages({ message, next }) {
  console.log(message);
  if (message.bot_id) {
    return;
  }
  if (!message.subtype || message.subtype !== "bot_message") {
    const data = {
      conversa: message.text,
      usuario: message.user,
      channel: message.channel,
    };
    await testemodel.saveMessage(data);
    const teste2 = await testemodel.getAllDay(data.usuario);
    // console.log(teste2.length == 2);
    if (teste2.length == 1) {
      fetch(
        "https://hooks.slack.com/services/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",
        { method: "POST", body: JSON.stringify({ text: "Bom dia1!" }) }
      );
    }
    if (teste2.length == 2) {
      fetch(
        "https://hooks.slack.com/services/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",
        { method: "POST", body: JSON.stringify({ text: "Bom dia2!" }) }
      );
    }
    if (teste2.length == 3) {
      fetch(
        "https://hooks.slack.com/services/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",
        { method: "POST", body: JSON.stringify({ text: "Bom dia3!" }) }
      );
    }
    if (teste2.length >= 4) {
      fetch(
        "https://hooks.slack.com/services/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",
        {
          method: "POST",
          body: JSON.stringify({ text: "voce ja respondeu hoje!" }),
        }
      );
    }
    await next();
  }
}

// The listener only receives messages from humans
app.message(noBotMessages, async ({ message }) => {});

app.action("button_click", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  // const teste = await testemodel.getAllDay("teste");
  // console.log("⚡️ Bolt app is running!", teste);
  const client = new WebClient(process.env.SLACK_TOKEN, {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG,
  });

  let usersStore = {};

  try {
    // Call the users.list method using the WebClient
    const result = await client.users.list();

    saveUsers(result.members);
  } catch (error) {
    console.error(error);
  }

  // Put users into the JavaScript object
  function saveUsers(usersArray) {
    let userId = "";
    usersArray.forEach(function (user) {
      // Key user info on their unique user ID
      userId = user["id"];
      console.log(user.name);
      // Store the entire user object (you may not need all of the info)
      usersStore[userId] = user;
    });
  }
})();
