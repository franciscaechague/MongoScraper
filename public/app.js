$( document ).ready(function() {
    $('#scrape').click(function(){
      $.getJSON("/scrape");
      alert("50 articles were found");
      $.getJSON("/articles", function(data) {
          for (var i = 0; i < data.length; i++) {
          $("#topArticles").append("<div class='articleTitle'><strong>"+ data[i].title +
          "</strong></div> <a class='articleLink'href=" + data[i].link + ">Read Article</a><button class='saveArticle' id='"
          + data[i]._id + "'> Save Article </button>");
      }
    $('.saveArticle').click(function(){
      var thisId = $(this).attr("id");
      $.ajax({
        method: "GET",
        url: "/articles/" + thisId
      }).done(function(data) {
        console.log(data);
        $.ajax({
          method: "POST",
          url: "/saved",
          data: {
            id: data.id,
            title: data.title,
            link: data.link
          }
        })
      });

    });

});
    });
});
