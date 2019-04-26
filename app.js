const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//app.use(express.static('public'));

//console.log("from db.js", db.DB.getProducts('test'));
// app.get('/products', (req, res) => {
//     db.DB.getProducts('test')
//  });
app.get('/products', (req, res) => { 
    //console.log("req.body",req.body)
    fs.readFile('products.json', (err, rawData)=>{
        if(err) throw err;
        let jsonData= JSON.parse(rawData);
        res.send(jsonData);  

        
        let existingId = jsonData[jsonData.length-1].id;
        let newId = existingId+1;

        var newData = {
            "id": newId,
            "name": "Leaf Rake",
            "code": "GDN-0011",
            "releaseDate": "Mar 19, 2016",
            "description": "Leaf rake with 48-inch wooden handle.",
            "price": 19.95,
            "starRating": 3.2,
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
        };

        jsonData.push(newData);
    
        fs.writeFile('products.json', JSON.stringify(jsonData, null, 2), (err)=>{
            if(err) throw err;
            console.log('Done!')
        });
    });    
 }); 

app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
});


