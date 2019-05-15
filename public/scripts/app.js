/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function renderTweets(tweets) {
    for (const tweet of tweets) {
        const $tweet = createTweetElement(tweet);
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
// renderTweets(data);

$('.new-tweet form').on('submit', function(event) {
  // stopping the form to being submitted
  event.preventDefault();
  $.ajax({
    method: 'POST',
    url: "/tweets",
    data: $(this).serialize()
  })
    // callback function when the request is done. We have access to the response.
    .done(response => {
      // Creating and adding all the posts to the page
      console.log($(this).serialize());
    })
    // Catching an error with the request
    .fail(error => {
      console.log(`Error: ${error}`);
    })
    // This will always execute
    .always(() => {
      console.log('Request completed.');
    });
 
}) 

function loadtweets (url) {
  console.log(url);
  $.ajax({
    method: 'GET',
    url: url,
  })
    // callback function when the request is done. We have access to the response.
    .done(response => {
      console.log(response);
      // Creating and adding all the posts to the page
      renderTweets(response);
    })
    // Catching an error with the request
    .fail(error => {
      console.log(`Error: ${error}`);
    })
    // This will always execute
    .always(() => {
      console.log('Request completed.');
    });
};

loadtweets("http://localhost:8080/tweets");

});