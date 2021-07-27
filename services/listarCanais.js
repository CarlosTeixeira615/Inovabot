const {WebClient} = require("@slack/web-api")
const token = "";
const client = new WebClient(token);


let conversationsStore = {};
let conversationIds = {};

async function populateConversationStore() {
    try {
      // Call the conversations.list method using the WebC lient
      const result = await client.conversations.list();
  
      saveConversations(result.channels);
    }
    catch (error) {
      console.error(error);
    }
  }


function saveConversations(conversationsArray) {
    let conversationId = '';
    
    conversationsArray.forEach(function(conversation){
      // Key conversation info on its unique ID
      conversationName = conversation["name"];
      conversationId = conversation["id"];
      // Store the entire conversation object (you may not need all of the info)
      conversationsStore[conversationName] = conversation;
      conversationIds[conversationId] = conversation;

      console.log(`${conversationName} ===> ${conversationId}`)
      
   
    
    })};
    
    module.exports ={populateConversationStore}