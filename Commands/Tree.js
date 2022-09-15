const fs = require("fs");
const path = require("path");



function treeFn(dirpath){
    if (dirpath == undefined) {
      console.log("Please input a valid directory path");
      return; //agar path nhi dia toh yhi p end ho jayega
    } //check dir path is passed or not
    else{
      let doesExists = fs.existsSync(dirpath); //checks whether the path given is exits or not
      if(doesExists==true){
        treeHelper(dirpath,' ')//indent leta hai folder k andar files space leta hai soo 
      }
    }
  }
  function treeHelper(targetpath,indent){
    let isfile=fs.lstatSync(targetpath).isFile()//isme bhi check krna hoga arrange krna s phle s ki folder h ki file hai so..
  
    if(isfile==true){
      let filename=path.basename(targetpath)
      console.log(indent + "├──" + filename)//include syumbol-linux tree symbol-basically for indentation
    }
    else{
      let dirname=path.basename(targetpath)//isme folder hi hoga
      console.log(indent+"└──"+dirname)//bar symbol
  
      let children=fs.readdirSync(targetpath)//folder k under k content-testfolder>>organised_files dega 
      
      for(let i=0;i<children.length;i++){
        let childpath=path.join(targetpath,children[i])
        treeHelper(childpath,indent +"\t")//asa recursion chalega jab tak folder counter hoga chalta rhega
      }
  
    }
  
  }

  module.exports = {
    treeFnKey : treeFn
  }
  