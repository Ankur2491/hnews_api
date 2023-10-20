const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3000;

app.post("/search", async(req, res)=>{
    let searchType = req.body.type;
    let query = req.body.query;
    if(searchType == 'relevance') {
        let resp = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}&tags=story`)
        let json = await resp.json()
        res.send(json);
    }
    else {
        let resp = await fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story`)
        let json = await resp.json();
        res.send(json);
    }
});

app.post("/searchByPage", async(req, res)=>{
    let searchType = req.body.type;
    let query = req.body.query;
    let page = req.body.page;
    if(searchType == 'relevance') {
        let resp = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}&tags=story&page=${page}`)
        let json = await resp.json()
        res.send(json);
    }
    else {
        let resp = await fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story&page=${page}`)
        let json = await resp.json();
        res.send(json);
    }
});
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });