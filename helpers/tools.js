const csv = require('csvtojson');

const parseFile = async (file) =>{
    try {
        const lines = await csv()
        .fromString(file)
        .then(async (csvRow)=>{ 
            return linesCleaner(csvRow);
        });

        return lines;
    } catch (error) {
        return null
    }
    
    //return lines;
}

function linesCleaner(csvRow = []){
    let auxRow = [];
    csvRow.forEach( (val)=> {
        
        //console.log(index, ' - ',array);
        if(val['text'] !== undefined && val['number'] !== undefined && val['hex'] !== undefined){
            //console.log(val)
            const resp = validKeys(val);
            if(resp){
                if(val['text'] !== "" && val['number'] !== "" && val['hex'] !== ""){
                    //console.log(val);
                    auxRow.push({
                        "text"  :val['text'],
                        "number":val['number'],
                        "hex"   :val['hex']
                    });
                }
            }
            
        }
    })
    return auxRow;
}
function validKeys(row){
    let listKeys = [];
    
        for(var key in row){
           // console.log(row[key]);
            listKeys.push(key);
        };
        const resp = listKeys.filter(e => e!=='file' && e!=='text' && e!=='number' && e!=='hex');
        //console.log(resp)
        if(Object.entries(resp).length === 0){
            return true;
        }else{
            return false;
        }
    }
module.exports = {
    parseFile
}