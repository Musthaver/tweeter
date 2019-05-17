

const tweetsUrl = "/tweets";

//Loop through DB array and send each element to creteTweetElement, prepend result to Tweets section
function renderTweets(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets').prepend($tweet);
  }
} 

//function to build HTML article
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
  let postTime = new Date(tweetObj["created_at"]);
  console.log(postTime)
  let timeDiff = moment(postTime).fromNow();
  const $footerP = $('<p>').text(timeDiff);
  const $icons = $('<div>');
  const $flag = $('<i>').addClass('fas fa-flag');
  const $retweet = $('<i>').addClass('fas fa-retweet');
  const $heart = $('<i>').addClass('far fa-heart');
  
  $icons.append($flag).append($retweet).append($heart);
  $footer.append($footerP).append($icons);
  $article.append($footer);

  return $article;
};



//Get tweets with Ajax
const loadTweets = (url, amount) => {
  
  $.ajax({
    method: 'GET',
    url: url,
  })
    // callback function when the request is done. We have access to the response.
    .done(response => {
      // Creating and adding  either all the posts to the page or just the newest addition
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
    .always(() => {
      console.log('Get completed.');
    });
};

//function to hide the Compose box on load and handle the compose toggle
const hideCompose = () => {
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

//function to validate input length and display error message accordingly
const validateInputLength = (input) => {
  if (input.length <= 0) {
    $('.isa_error > span').text("Please enter a valid tweet.");
    $('.isa_error').slideDown();
    $('.new-tweet form textarea').on('focus', function(event) {
      $('.isa_error').slideUp();
    });
    
  } else if (input.length > 140) {
    $('.isa_error > span').text("Tweets must be under 140 characters. Please shorten your tweet.");
    $('.isa_error').slideDown();
    $('.new-tweet form textarea').on('focus', function(event) {
      $('.isa_error').slideUp();
    });
  } else {
    return true;
  }
}  


//another way to write $(document).ready(function()
$(function() {

//hide the compose tweet section until toggled
hideCompose();

//listener on Compose tweet submit. validate before ajax call
$('.new-tweet form').on('submit', function(event) {  
  event.preventDefault();
  const input = $(this).find('textarea').val();

//run validation, if passes continue
if (validateInputLength(input)) {
  
  $.ajax({
    method: 'POST',
    url: "/tweets",
    data: $(this).serialize()
  })
    // callback function when the request is done. We have access to the response.
    .done((response) => {
      // Creating and adding the most recent tweet
      loadTweets(tweetsUrl, "some");
      //empty the textarea after submit complete
      const textarea = $(this).find('textarea');
      textarea.val('');
    })
    // Catching an error with the request
    .fail(error => {
      console.log(`Post Error: ${error}`);
    })
    .always(() => {
      console.log('Post completed.');
    });
  }
}) 

//Load all existing tweets on page load
loadTweets(tweetsUrl, "all");

});