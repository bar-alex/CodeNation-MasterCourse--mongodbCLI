// --add [--movie] "name: actor, actor, actor"    // adds one movie
// --add [--movies] "name: actor, actor; name: actor, actor"  // adds more movies
// --list [--movie] ["[$]name"]       // list movie that has the name or contains name (if $)
// --list --actor ["[$]name"]         // list the movies that has the actor name or contains name (if $)
// --delete [--movie] "[$]name"     // delete the movie named name (case insensitive) or contains name (if $)
// --delete --actor "[$]name"       // delete all movies that have the actor named name (case insensitive) or contains name (it $)
// --replace [--movie] "old_name:new_name"  // will replace the movie that has the old_name to new_name, old_name is case insensitive
// --replace --actor "old_name:new_name"    // will replace the actor from old_name to new_name across all movies, old_name is case insensitive
// --purge                          // delete all data
// --demo                           // will fill the database with demo data


const yargs = require("yargs");
const { client, connection } = require("./db/connection");
const { addMovie, listMovies } = require("./utils");

const app = async (yargsObj) => {

    console.log(yargsObj);
    return; 
    const collection = await connection();

    const [opCreate, opRead, opUpdate, opDelete] = [yargsObj.add, yargsObj.list, yargsObj.replace, yargsObj.delete];
    const [opPurge, opDemo] = [yargsObj.purge, yargsObj.demo];
    const [flagActor, flagMovie] = [yargsObj.actor || yargsObj.actors, yargsObj.movie || yargsObj.movies];



    try {
        if (yargsObj.add) {
            // add movie or movies to mongodb
            await addMovie( collection, {title: yargsObj.title} )
        } else if (yargsObj.list) {
            // list movies from mongodb
            await listMovies(collection);
        } else 
            console.log("incorrect command");
    } catch (error) {
        console.log(error);
    } finally {
        await client.close()
    }
}

app(yargs.argv);
