const { response, request } = require('express');
const { filesRequest, fileRequest } = require('../requests/requests');
const { parseFile } = require('../helpers/tools');
const csv = require('csvtojson')

const getFiles = async(req = request, res = response) => {

    const resp = await filesRequest();
    if(resp !== null){
        //console.log('Todo bien');
        //console.log(resp);
        
        let listFiles = [];
        for(let i=0; i<resp.length; i++){
            const fileResp = await fileRequest(resp[i]);
            if(fileResp !== null){
                const lines = await parseFile(fileResp);
                //---------------------------------------
                
                //const lines = await csv()
                //.fromString(fileResp)
                //.then((csvRow)=>{ 
                //    //console.log(csvRow) // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
                //    //lines = ;
                //    return csvRow
                //})

                //---------------------------------------
                if(lines !== null && Object.entries(lines).length !== 0){
                    const file = {
                        "file": `${resp[i]}`,
                        "lines": lines
                    }
                    listFiles.push(file);
                }
                //else
                //    console.log(resp[i],'No tiene info');
                
                
            }
        }

        res.json(listFiles);
    }else{
        //console.log('Todo mal');
        res.json({
            msg: 'Todo mal'
        });
    }
}


module.exports = {
    getFiles
}