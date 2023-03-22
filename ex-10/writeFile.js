const fs = require("fs");

fs.writeFile("output.txt","HelloWorld", (err)=>{
    if(err) return false;
    console.log("il file è stato salvato")
})