// We will be creating a File System Organizer
////Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders


const helpModule = require("../Commands/Help");

const organizeModule = require("../Commands/Organize");

const treeModule = require("../Commands/Tree");

let input = process.argv.slice(2);
let inputArr = input;
let command = inputArr[0];



switch (command) {
  case "Tree":
    treeModule.treeFnKey(inputArr[1]);
    break;
  case "Organize":
    organizeModule.organizeFnkey(inputArr[1]);
    break;
  case "Help":
    helpModule.helpFnKey();
    break;
  default:
    console.log("Please Input a valid command");
    break;
}
