
exports.addMovie = async (collection, movieObj) => {
    const response = await collection.insertOne( movieObj );
    //return response;
    if (response.acknowledged){
        console.log("Succesfully added movie");
    } else {
        console.log("Somethign went wrong");
    }
}

exports.listMovies = async (collection) => {
    const response = await collection.find().toArray();
    console.log(response);

}