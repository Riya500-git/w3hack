const MarketPlace = require("../models/marketplace");

const fetchAllProjects = async (req, res) => {

    let MarketPlaces = await MarketPlace.find();
    if (!MarketPlaces) {
        res.status(400).send("MarketPlaces projects not found!")
    }

    console.log(MarketPlaces);
    
    res.status(200).send(MarketPlaces);
}


module.exports = {
    fetchAllProjects
}
