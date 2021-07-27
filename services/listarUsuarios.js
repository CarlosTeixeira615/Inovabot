const {WebClient} = require("@slack/web-api")
const client = new WebClient("");

(async () => {
  
  
    let usersStore = {};
  
    try {
      // Call the users.list method using the WebClient
      const result = await client.users.list();
  
      saveUsers(result.members);
    } catch (error) {
      console.error(error);
    }
  
    // Put users into the JavaScript object
    async function saveUsers(usersArray) {
      let userId = "";
      usersArray.forEach(function (user) {
        // Key user info on their unique user ID
        userId = user["id"];
        //console.log(user);
        // Store the entire user object (you may not need all of the info)
        usersStore[userId] = user;
        if(user["is_bot"] == false && user["deleted"] == false && user["is_email_confirmed"] == true){
          console.log(user.name)
        }
      });
    }
  })();
