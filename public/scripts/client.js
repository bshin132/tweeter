$(document).ready(() => {
  //
  //VALIDATE INPUT FIELD
  //
  $(".warning").hide()
  $("#post-tweet").on("submit", (event) => {
    event.preventDefault();
    const userValue = $("#tweet-text").serialize();

    if (userValue === "text=") {
      $(".warning").slideDown();
      const $errorMessage = $(".error-message");
      $errorMessage.text("This field cannot be blank!");
      setTimeout(() => {
        $(".warning").slideUp();
      }, 5000);
      return;

    } else if (userValue.length > 145) {
      $(".warning").slideDown();
      const $errorMessage = $(".error-message");
      $errorMessage.text("You can only enter 140 characters.");
      setTimeout(() => {
        $(".warning").slideUp();
      }, 5000);
      return;
    //
    //AJAX POST REQUEST
    //
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: userValue,
        success: () => {
          loadTweets();
          console.log("success");
        },
      });
    }
  });

  //
  //POST FORM ON PAGE
  //
  const renderTweets = function (tweets) {
    const $tweets = $("#tweets-container");
    $tweets.empty();

    tweets.forEach((tweet) => {
      $tweets.append(createTweetElement(tweet));
    });
  };

  //
  //PREVENT XSS(USER CAN'T INPUT JAVASCRIPT) ESCAPE METHOD
  //
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //
  //CREATE TWEET FORM WITH DATA
  //
  const createTweetElement = (tweet) => {
    return $(`
    <article>      
    <header class="article-header">
      <div class="profile-name">
        <img class="user-emoji" src=${tweet.user.avatars} /> 
        <p>${tweet.user.name}</p>
      </div>
      <p class="userid">${tweet.user.handle}</p>
    </header>

    <div>
      <p class="user-input">${escape(tweet.content.text)}</p>
    </div>
    <div class="border"></div>

    <footer>
      <p>${timeago.format(tweet.created_at)}</p>
      <div class="react-emoji">
        <i class="fas fa-thumbs-up"></i>
        <i class="fas fa-comment"></i>
        <i class="fas fa-flag"></i>
      </div>
    </footer>
    
  </article>`);
  };


  //
  //AJAX GET REQUEST
  //
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    })
      .then((res) => {
        renderTweets(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  loadTweets();
});
