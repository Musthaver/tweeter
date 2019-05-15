/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetsUrl = "/tweets";

function renderTweets(tweets) {
    for (const tweet of tweets) {
        const $tweet = createTweetElement(tweet);
        $('#tweets').prepend($tweet);
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


function loadTweets (url, amount) {
  
  $.ajax({
    method: 'GET',
    url: url,
  })
    // callback function when the request is done. We have access to the response.
    .done(response => {
      // Creating and adding all the posts to the page

      if(amount === "all") {
        renderTweets(response);
      } else {
        const $tweet = createTweetElement(response.pop());
        $('#tweets').prepend($tweet);
      }
      
    })
    // Catching an error with the request
    .fail(error => {
      console.log(`Get Error: ${error}`);
    })
    // This will always execute
    .always(() => {
      console.log('Get completed.');
    });
};

$(function() {


$('.new-tweet form').on('submit', function(event) {
  console.log($(this).serialize());
  const input = $(this).serialize();
  if (input.length <= 5) {
    alert("please enter a valid tweet");
  } else if (input.length >= 146) {
    alert("input too long, please shorten your tweet")
  } else {
  // stopping the form to being submitted
  event.preventDefault();
  
  $.ajax({
    method: 'POST',
    url: "/tweets",
    data: $(this).serialize()
  })
    // callback function when the request is done. We have access to the response.
    .done(function(response) {
      // Creating and adding all the posts to the page
      loadTweets(tweetsUrl, "some");
      //empty the textarea after submit complete
      // const textarea = $(this).find('textarea');
      // console.log($(this));
      // textarea.val('');
      // console.log(textarea.val());
    })
    // Catching an error with the request
    .fail(error => {
      console.log(`Post Error: ${error}`);
    })
    // This will always execute
    .always(() => {
      console.log('Post completed.');
    });
  }
}) 

loadTweets(tweetsUrl, "all");

});