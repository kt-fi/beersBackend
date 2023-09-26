const beerSchema = require("../schemas/beerSchema")

const HttpError = require("../httpError/httpError");
const Beer = require("../schemas/beerSchema");


const { v4: uuidv4 } = require('uuid');

//CREATE NEW BEER FOR DB
const createBeer = async (req, res, next) => {

    const {name, category, style, country, alcohol, imageUrl, color, description, notes} = req.body;

    try{
       let beer = await new Beer({
        beerId: uuidv4(),
        name: name,
        category: category,
        style: style,
        country: country,
        alcohol: alcohol,
        imageUrl: imageUrl,
        color: color,
        description: description,
        notes: notes
    });

    await beer.save();
    res.json(beer);

    }catch(err){
    let error = new HttpError(err, 404);
    return next(error)
    }
 
}


// GET LIST OF ALL BEERS
const getAllBeers = async (req, res, next) => {

    let beers;
    
    try{
        beers = await Beer.find();
    }catch(err){
        let error = new HttpError("Unable to Find Beers", 404);
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
    
    const beerId = req.params.id;
    let beer;
    try{

       beer = await  Beer.findOneAndRemove({beerId});
        res.json(beer);

    }catch(err){
        let error = new HttpError("Error Message Here", 404);
        return next(error)
    }

}

// EDIT BEER

const editBeer = async (req, res, next) => {

    const beerId = req.params.beerId;

    const {name, category, style, country, alcohol, imageUrl, color, description, notes} = req.body;

    let beerToUpdate;

    try{

        beerToUpdate = await Beer.findOne({beerId});
     

    }catch(err){
        let error = new HttpError(err, 404);
        return next(error)
    }

    if(name)beerToUpdate.name = name;  
    if(category)beerToUpdate.category = category;
    if(style)beerToUpdate.style = style;
    if(country)beerToUpdate.country = country;
    if(alcohol)beerToUpdate.alcohol = alcohol;
    if(imageUrl)beerToUpdate.imageUrl = imageUrl;
    if(color)beerToUpdate.color = color;
    if(description)beerToUpdate.description = description;
    if(notes)beerToUpdate.notes = notes;

    try{
        await beerToUpdate.save();
    }catch(err){
        // res.send("Could Not Save Neww Beer")

    }
   await res.json(beerToUpdate)
}


// FILTER BEERS???
 const getBeersFilter = async (req, res, next) => {
    let filters = req.query;
    
    let foundBeer;

    console.log(filters)

    try{
        foundBeer = await Beer.find({...filters})
        if(foundBeer){
         res.json(foundBeer)   
        }else{
            let error = new HttpError("No Beer Found", 404)
            return next(error)
        }
        
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


