/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];



function renderTweets(tweets) {
    for (const tweet of tweets) {
        const $tweet = createTweetElement(tweet);
        console.log($tweet);
        $('#tweets').append($tweet);
    }
} 

const createTweetElement = (tweetObj) => {

    const $article = $('<article>');

    //create and add header elements
    const $header = $('<header>');
    const $headerImg = $('<img>').addClass('avatar').attr('src', tweetObj.user.avatars.small);
    const $headerH2 = $('<h2>').addClass('user').text(tweetObj.user.name);
    const $headerP = $('<p>').text(tweetObj.user.handle);
    $header.append($headerImg).append($headerH2).append($headerP);
    $article.append($header);

    //create main tweet area elements
    const $mainP = $('<p>').addClass('content').text(tweetObj.content.text);
    $article.append($mainP);

    //create and add footer elements
    const $footer = $('<footer>');
    const $footerP = $('<p>').text(tweetObj["created_at"]);
    const $icons = $('<div>');
    const $flag = $('<i>').addClass('fas fa-flag');
    const $retweet = $('<i>').addClass('fas fa-retweet');
    const $heart = $('<i>').addClass('far fa-heart');
    
    $icons.append($flag).append($retweet).append($heart);
    $footer.append($footerP).append($icons);
    $article.append($footer);

    return $article;
};

$(function() {
renderTweets(data);
});