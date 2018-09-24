var http = require('http');
var jwt = require("jsonwebtoken");
var fs = require("fs");
var jsonDatabse = "./encrypData";
var $=require("jquery");
var formatjson = require("format-json")
module.exports = Cookie = {
    decrypters:{
        allKey:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        evl:"",
        an:"",
        index:15,
        value:"null",
        numNull: 0,
        date:"null",
        enc:"null", 
        algorithim:"8273",
        randvalue:"null"
    },
    readDatabase: function (database,nameofJsonPrent) {
        var DataArray = [];
        var allDataFileJsonStringify = JSON.stringify(this.decrypters,null,2);
        var notSting = {
            [nameofJsonPrent]: this.decrypters
        }
        fs.readFile(`./encrypData/${database}`, function (err, fileData) {
            dataInFile = JSON.parse(fileData);
            dataStringify = JSON.stringify(dataInFile);
            if(dataStringify == "[]") 
                fs.writeFile(`./encrypData/${database}`, "[{" + '"' + nameofJsonPrent + '"' + ":" + allDataFileJsonStringify + "}]", function (err) {
                    if (err) console.log (err)
                })
            else
                getIndex = dataStringify.lastIndexOf("}");
                splitString = dataStringify.split("]");
                firstVarcHar = splitString[0];
                appendedStrings = firstVarcHar + "," + JSON.stringify(notSting) + "]";
                fs.writeFileSync(`./encrypData/${database}`, formatjson.plain(JSON.parse(appendedStrings)));
                console.log(formatjson.plain(JSON.parse(appendedStrings)));
        })
    },
    ejsCreateFile:function(filename){
        fs.readdir("./encrypData",function(err,files){
            if (err) throw err;
            else
                if (files.length > 0 )
                    files.find(function (currentValue, index, arr) {
                        nevilFile = arr.includes(filename) ? "found" : "not found";
                        if (nevilFile == "found")
                            console.log("file already exists")
                        else if (nevilFile == "not found")   
                            fs.open(`./encrypData/${filename}`, 'w', function (err) {
                                fs.writeFile(`./encrypData/${filename}`, "[]", function (err) {
                                    if (err) throw err
                                    else
                                        console.log("file is written")
                                })
                            })
                    });
                else
                    fs.open(`./encrypData/${filename}`, 'w', function (err) {
                        fs.writeFile(`./encrypData/${filename}`, "[]", function (err) {
                            if (err) throw err
                            else
                                console.log("file is written")
                        })
                    })
        })
    },
    encrypt:function(p){
        try{
            if (p != "" && p != undefined && p != "object" && typeof p === 'number' ) {
                this.decrypters.randvalue = Math.floor(Math.random()*p);
                var date = new Date();
                this.decrypters.date = date.getSeconds();
                for(var j = 0; j < this.decrypters.index; j++)
                    this.decrypters.evl += this.decrypters.allKey.charAt(Math.floor(Math.random() * this.decrypters.allKey.length));
                for(var n = 0; n < 5; n++)
                    this.decrypters.an += this.decrypters.allKey.charAt(Math.floor(Math.random() * this.decrypters.allKey.length));
                var ename = p * this.decrypters.algorithim;
                var spliter = ename.toString().slice(0, 3);
                var anodd = ename.toString().split(spliter);
                return this.decrypters.enc = this.decrypters.evl + `${spliter}_${this.decrypters.an + anodd[1]}==`;
            }else{
                var error = new Array('a','an');
                if (typeof p == "string") {
                    return `${p} is ${error[0]} ${typeof p} it can not be encrypted`;
                }else{
                    return `${p} is ${error[1]} ${typeof p} character it can not be encrypted.`;
                }
                
            }
        }catch(error){
            console.log(error);
        }
        
    },
    decrypt: function (key) {
        var removeChar = key.slice(this.decrypters.index);
        var getIndices = removeChar.split("==");
        var nb = getIndices[0];
        splitIndices = nb.split('_');
        getLast = splitIndices[1].toString().slice(5);
        together =  splitIndices[0] + getLast;
        return together / this.decrypters.algorithim;
    },
    setCookie: function (options) {
        try {
            if (typeof options == "object") 
                var createDate, getDate,Exp;
                createDate = new Date();
                getDate = createDate.getTime();
                createDate.setTime(getDate + (options.date * 24 * 60 * 60 * 1000));
                Exp = createDate.toUTCString();
                return http.cookie = `${options.cookieName}=${options.cookieValue};expires=${Exp};path=${options.path}`;
        } catch (error) {
            console.log(`${error}.Applxe error found report to nevilpaul`);
        }
    },
    get: function (options) {
        console.log(options);
    }
}
