console.log('This is bot');

var Twit = require('twit');
var config = require('./congif');
var tweetJson = require('./aleezaBotTweets.json');


console.log(config);
var T = new Twit(config);

// var param = { 
//     q: 'Dog Love',
//     count: 5
//  };

// T.get('search/tweets', param , twitterGet);

// function twitterGet(err, data, response){
//     var tweets = data.statuses;
//     for(var i=0; i<tweets.length; i++){
//         console.log(tweets[i].text);
//         console.log(' ');
//     }
// }





var stream = T.stream('user');

stream.on('follow', followed);

function followed(userData) {
    var name = userData.source.name;
    var twitterHandle = userData.source.screen_name;
    console.log(name, twitterHandle + ' just followed me :D ');
    tweetIt('@' + twitterHandle + ' Thank you for following me :D #BOT #Alleza');
}


//Someone tweet 
stream.on('tweet', tweetEvent);
function tweetEvent(eventData) {
    var tweetTo = eventData.in_reply_to_screen_name;
    var tweetText = eventData.text;
    var tweetFrom = eventData.user.screen_name;

    if(tweetTo === 'AleezaBOT'){
        var tweetReply = '@' + tweetFrom + ' Thank you for tweet me ! :D #BOT' ;
        tweetIt(tweetReply);
    }
}


stream.on('unfollow', unfollowed);
function unfollowed(userData) {
    var name = userData.source.name;
    var twitterHandle = userData.source.screen_name;
    console.log(name, twitterHandle + ' just unfollow me :( ');
    tweetIt('@' + twitterHandle + ' I thought we were good friends #BOT #Alleza :,(  ');
}

stream.on('favorite', favorited);
function favorited(userData) {
    var name = userData.source.name;
    var twitterHandle = userData.source.screen_name;
    console.log(name, twitterHandle + ' just like my tweet :D ');
    tweetIt('@' + twitterHandle + ' Thanks for liking my tweet :* #BOT #Alleza');
}


function tweetIt(tweetText) {

    var newTweet = { 
        status: tweetText
    };

    T.post('statuses/update', newTweet, postTweet);

    function postTweet(err, data, response) {
        if (err)
            console.log('Something went wrong: ' + err);
        else
            console.log('Tweet is posted ! YAY ');
    }

}


var tweetCounter = 0;
setInterval(postRandomTweet, 1000*60*60);


function postRandomTweet() {
    tweetIt(tweetJson.tweets[tweetCounter].text);
    console.log(tweetJson.tweets[tweetCounter].text);
    tweetCounter++;
}