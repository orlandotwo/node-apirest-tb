const axios = require('axios');

filesRequest = async() => {
    try {
        const instance = axios.create({baseURL: 'https://echo-serv.tbxnet.com/v1/secret/files/',
        //auth: {authorization:'Bearer aSuperSecretKey'},
        headers: {authorization:'Bearer aSuperSecretKey'}
        });
        const { data } = await instance.get();
        //console.log(data);

        if(data['files'] !== undefined){
            const listFiles = data['files'];
            //console.log('ready')
            //console.log(listFiles);
            return listFiles
        }
        
        
       
    } catch (error) {
        console.log('ERROR');
        console.log(error);
        //console.log('--------------------------------');
        //console.log(error['config']['headers']);
        //console.log(error['config']['auth']);
        return error;
    }
}

fileRequest = async(file) => {
    try {
        const instance = axios.create({baseURL: `https://echo-serv.tbxnet.com/v1/secret/file/${file}`,
            headers: {authorization:'Bearer aSuperSecretKey'}
        });

        const { data } = await instance.get();
        //console.log('Respuesta de ', file);
        return data;
    } catch (error) {
        //console.log('Error -> ', file);
        return null;
    }
}

module.exports = {
    filesRequest,
    fileRequest
}