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
    const $footerP = $('<p>').text(new Date(tweetObj["created_at"]));
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

function hideCompose() {
  const newTweet = $('.new-tweet');
  newTweet.hide();

  $('#nav-bar .compose').on('click', function(event) {  
    if (newTweet.hasClass('hidden')) {
      newTweet.slideDown().find('textarea').focus();
      newTweet.removeClass('hidden')
    } else {
      newTweet.slideUp().addClass('hidden');
    }  
  });
}


$(function() {

hideCompose();
 
$('.new-tweet form').on('submit', function(event) {  
  event.preventDefault();
  const input = $(this).find('textarea').val();
  
//validation
  if (input.length <= 0) {
    $('.isa_error > span').text("Please enter a valid tweet");
    $('.isa_error').slideDown();
    $('.new-tweet form textarea').on('focus', function(event) {
      $('.isa_error').slideUp();
    });
    
  } else if (input.length > 140) {
    $('.isa_error > span').text("input too long, please shorten your tweet");
    $('.isa_error').slideDown();
    $('.new-tweet form textarea').on('focus', function(event) {
      $('.isa_error').slideUp();
    });
  } else {
  
  $.ajax({
    method: 'POST',
    url: "/tweets",
    data: $(this).serialize()
  })
    // callback function when the request is done. We have access to the response.
    .done((response) => {
      // Creating and adding all the posts to the page
      loadTweets(tweetsUrl, "some");
      //empty the textarea after submit complete
      const textarea = $(this).find('textarea');
      textarea.val('');
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