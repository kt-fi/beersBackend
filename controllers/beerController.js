const beerSchema = require("../schemas/beerSchema")

const HttpError = require("../httpError/httpError");
const Beer = require("../schemas/beerSchema");


//CREATE NEW BEER FOR DB
const createBeer = async (req, res, next) => {

    const {beerName, beerType, origin, taste, alcohol, foodSuggestion, price} = req.body;

    try{
       let beer = await new Beer({
        beerName: beerName,
        beerType: beerType,
        origin: origin,
        taste: taste,
        alcohol: alcohol,
        foodSuggestion: foodSuggestion,
        price: price
    });

    await beer.save();
    res.json(beer);

    }catch(err){
    let error = new HttpError("Error Message Here", 404);
    return next(error)
    }
 
}


// GET LIST OF ALL BEERS
const getAllBeers = async (req, res, next) => {

    let beers;
    
    try{
        beers = await Beer.find();
    }catch(err){
        let error = new HttpError("Error Message Here", 404);
        return next(error)
    } 
    res.json(beers.map(beer=> beer.toObject({getters:true})))

}

// GET A SPECIFIC BEER

const getOneBeer = async (req, res, next) => {

    const beerId = req.params.beerId;

    try{
        const foundBeer = await Beer.findById(beerId);

        if(!foundBeer){
            res.send("NO BEER FOUND");
        }else{
            res.json(foundBeer)
        }
    }catch(err){
        let error = new HttpError("Error Message Here", 404);
        return next(error)
    }
}



// DELETE BEER

const deleteBeer = async (req, res, next) => {

    const beerId = req.body.beerId;

    try{

        await Beer.findByIdAndRemove(beerId);
        res.send(beerId);

    }catch(err){
        let error = new HttpError("Error Message Here", 404);
        return next(error)
    }

}

// EDIT BEER

const editBeer = async (req, res, next) => {

    const beerId = req.params.beerId;

    const {beerName, beerType, origin, taste, alcohol, foodSuggestion, price} = req.body;

    let beerToUpdate;

    try{

        beerToUpdate = await Beer.findById(beerId);
        await beerToUpdate.save();

    }catch(err){

        res.send("ERROR CAUGHT")
    }

    if(beerName)beerToUpdate.beerName = beerName;  
    if(beerType)beerToUpdate.beerType = beerType;
    if(origin)beerToUpdate.origin = origin;
    if(taste)beerToUpdate.taste = taste;
    if(alcohol)beerToUpdate.alcohol = alcohol;
    if(foodSuggestion)beerToUpdate.foodSuggestion = foodSuggestion;
    if(price)beerToUpdate.price = price;

    try{
        await beerToUpdate.save();
    }catch(err){
        res.send("ERROR 2 CAUGHT")

    }
    res.json(beerToUpdate)
}

exports.createBeer = createBeer;
exports.getAllBeers = getAllBeers;
exports.getOneBeer = getOneBeer;
exports.deleteBeer = deleteBeer;
exports.editBeer = editBeer;


