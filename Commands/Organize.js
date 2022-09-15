const fs = require("fs");

const path = require("path");

let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

//organize function will organize your all folder files in a folder name organized files

function organizeFn(dirpath) {
  let destpath; //organized  folder k path
  if (dirpath == undefined) {
    console.log("Please input a valid directory path");
    return; //agar path nhi dia toh yhi p end ho jayega
  } //check dir path is passed or not
  let doesExists = fs.existsSync(dirpath); //checks whether the path given is exits or not

  if (doesExists == true) {
    destpath = path.join(dirpath, "organized_files"); //it creates a path for the folder with folder name

    if (fs.existsSync(destpath) == false) {
      fs.mkdirSync(destpath); //creates the folder if same name folder is not already exits
    } 
    else {
      console.log("folder already exits ");
    }
  } else {
    console.log("Please enter  a valid path");
    return;
  }

  organizeHelper(dirpath, destpath);
}

function organizeHelper(src, dest) {
  let childnames = fs.readdirSync(src);

  for (let i = 0; i < childnames.length; i++) {
    let childaddress = path.join(src, childnames[i]); //path mill jayega sab files k
    let isFile = fs.lstatSync(childaddress).isFile(); //check kar sakta h files yh folder

    if (isFile == true) {
      //keval files hi jayegi isme
      let fileCategory = getCategory(childnames[i]); //get category ek function bana k files ko organise krna h different folder m .
      console.log(childnames[i] + "belongs to " + fileCategory); //Admit Card.pdfbelongs to documents dega

      sendfiles(childaddress, dest, fileCategory);
    }
  }
}

function getCategory(Filename) {
  let ext = path.extname(Filename).slice(1); //yh .dot remove krka extension name dega same as type in object
  // console.log(ext)

  for (key in types) {
    let cTypeArr = types[key]; //yh types object ki vakues as a array  category type bna dega

    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext == cTypeArr[i]) {
        //yh loop tab tak chalega jabtak match n ho jaya
        return key;
      }
    }
  }

  return "others"; //if extension n hoga
}

function sendfiles(srcFilepath, dest, fileCategory) {
  //files send krna hai particular folder types k according
  let catpath = path.join(dest, fileCategory); //folder k lia path

  if (fs.existsSync(catpath) == false) {
    //dubara media file encounter ho toh nhi bano folder
    fs.mkdirSync(catpath);
  }

  let filename = path.basename(srcFilepath); //took out the base name of every files

  let destfilepath = path.join(catpath, filename);

  fs.copyFileSync(srcFilepath, destfilepath);

  fs.unlinkSync(srcFilepath);

  console.log("files organised");
}

module.exports = {
  organizeFnkey: organizeFn,
};
