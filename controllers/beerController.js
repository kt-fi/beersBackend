const beerSchema = require("../schemas/beerSchema")

const HttpError = require("../httpError/httpError");
const Beer = require("../schemas/beerSchema");


//CREATE NEW BEER FOR DB
const createBeer = async (req, res, next) => {

    const {beerName, type, origin, taste, alcohol, foodSuggestion, price, beerImage} = req.body;

    try{
       let beer = await new Beer({
        beerName: beerName,
        type: type,
        origin: origin,
        taste: taste,
        alcohol: alcohol,
        foodSuggestion: foodSuggestion,
        price: price,
        beerImage: beerImage
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

    const {beerName, type, origin, taste, alcohol, foodSuggestion, price, beerImage} = req.body;

    let beerToUpdate;

    try{

        beerToUpdate = await Beer.findById(beerId);
        await beerToUpdate.save();

    }catch(err){
        let error = new HttpError("Error Message Here", 404);
        return next(error)
    }

    if(beerName)beerToUpdate.beerName = beerName;  
    if(type)beerToUpdate.type = type;
    if(origin)beerToUpdate.origin = origin;
    if(taste)beerToUpdate.taste = taste;
    if(alcohol)beerToUpdate.alcohol = alcohol;
    if(foodSuggestion)beerToUpdate.foodSuggestion = foodSuggestion;
    if(price)beerToUpdate.price = price;
    if(beerImage)beerToUpdate.beerImage = beerImage;

    try{
        await beerToUpdate.save();
    }catch(err){
        res.send("ERROR 2 CAUGHT")

    }
    res.json(beerToUpdate)
}

 const getBeersFilter = async (req, res, next) => {
    let filters = req.query;
    
    let foundBeer;

  
    console.log(filters)

    try{
        foundBeer = await Beer.find({...filters})

        res.json(foundBeer)
    }catch(err){
        res.send(err)
    }

    

}

exports.createBeer = createBeer;
exports.getAllBeers = getAllBeers;
exports.getOneBeer = getOneBeer;
exports.deleteBeer = deleteBeer;
exports.editBeer = editBeer;
exports.getBeersFilter = getBeersFilter;


