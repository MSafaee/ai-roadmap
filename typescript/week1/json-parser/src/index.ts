
import { filterByAccount, filterByAge, filterByFirstName, filterByLastName, filterByPurchasedProduct } from "./filter.js";
import { loadUsers } from "./JSONParser.js";
import type { User } from "./user.js";

const JSON_FILE_PATH = "files/users.json";
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("wrong format");
  process.exit(1);
}

try{
  const users = loadUsers(JSON_FILE_PATH);

  switch(args[0]) {
    case "all" : {
      if(args.length !==1) console.log("Format: all");
      else printUsers(users);
      break;
    }
    case "firstname" : {
      if (args[1] === undefined || args.length !== 2) console.log("Format: firstname <name>");
      else printUsers(filterByFirstName(users, args[1]));
      break;
    }
    case "lastname" : {
      if (args[1] === undefined || args.length !== 2) console.log("Format: lastname <name>");
      else printUsers(filterByLastName(users, args[1]));
      break;
    }
    case "age" : {
      const ageMin = Number(args[1]);
      const ageMax = Number(args[2]);
      if (args.length !== 3 || Number.isNaN(ageMin) || Number.isNaN(ageMax)) 
        console.log("Format: age <number> <number>") 
      else printUsers(filterByAge(users, ageMin, ageMax));
      break;
    }
    case "premium" : {
      if (args.length !== 2) console.log("Format: premium <true/false>")
      if (args[1] !== "false" && args[1] !== "true") console.log("Format: premium <true/false>")
      else printUsers(filterByAccount(users, args[1] === "true"));
      break;
    }
    case "purchased" : {
      const productId = Number(args[1]);
      if (args.length !== 2 || Number.isNaN(productId)) console.log("Format: purchased <number>")
      else printUsers(filterByPurchasedProduct(users, productId));
      break;
    }
    default : console.log("Unknown filter.");
 }
}
catch (error) {
    if (error instanceof Error) console.log(error.message);
}

function printUsers(users: User[]): void {

  if (users.length === 0) {
    console.log("No users found.");
    return;
  }
  console.log(JSON.stringify(users));
}
