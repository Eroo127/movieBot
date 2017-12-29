'use strict';
const BootBot = require('bootbot');
const config = require('config');
const fetch = require('node-fetch');
var apiKey='9a32bccc0995a38d7c700d0b4fa8a79d'; //TMDB api key
var movieRecommendation = 'https://api.themoviedb.org/3/discover/movie?api_key='+apiKey+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres='; //API request to get the recommendation

//New bot with our facebook app details
const bot = new BootBot({
  accessToken: config.get('accessToken'),
  verifyToken: config.get('verifyToken'),
  appSecret: config.get('appSecret')
});



//welcome message triggered by user greeting
bot.hear(['hi', 'hello', 'hey'], (payload, chat) => {

  chat.say('Hello, Type Genre then add the genre of the recommendations you want. ');

});

//Reg expression that listens for the genre
bot.hear(/genre (.*)/i, (payload, chat, data) => {

  
 //Stringify the users response
  const query =  String(data.match[1]);

  //convert the response to lowercase to prevent request errors
  const res = query.toLowerCase();



  let id; 

//switch statement to match the genre stated to the genre ID
  switch(res) {
    case "comedy":

        id = 35;
        break;
    case "action":
        id = 28;
        break;
    case "adventure":
        id = 12;
        break;
    case "animation":
        id = 16;
        break;
    case "crime":
        id = 80;
        break;
    case "documentary":
        id = 99;
        break;
    case "drama":
        id = 18;
        break;
    case "family":
        id = 10751;
        break;
    case "fantasy":
        id = 14;
        break;
    case "history":
        id = 36;
        break;
    case "horror":
        id = 27;
        break;
    case "music":
        id = 10402;
        break;
    case "mystery":
        id = 9648;
        break;
    case "romance":
        id = 10749;
        break;
    case "science fiction":
        id = 878;
        break;
    case "tv movie":
        id = 10770;
        break;
    case "thriller":
        id = 53;
        break;
    case "war":
        id = 10752;
        break;
    case "western":
        id = 37;
        break;
    default:
        chat.say('That is not a genre.');
}

//Conditional to check if the genre matched any existing genre ID
  if(id!=undefined){

    //make the API request and store the response.
    fetch(movieRecommendation+id)
    .then(res => res.json())
    .then(json =>{


        //sends the movie title, overview and image in a facebook messenger generic template
           chat.sendGenericTemplate([{
      title: json.results[0].original_title,
      subtitle: json.results[0].overview,
      image_url:'http://image.tmdb.org/t/p/w500'+json.results[0].poster_path      
      }]);

    });

  
  chat.say('searching for recommendations... '); //declares that the bot is searching for the recommendation
  console.log(id);    

  }

});

//Start the bot server
bot.start(config.get('botPort'));
