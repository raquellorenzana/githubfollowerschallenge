$(function () {
    SearchModule.init();
});

var SearchModule = function () {

    var $results = $("#results");
    var $form = $("#github_search");
    var remainderDisplayed;
    var totalDisplayedFollowers;
    var totalFollowers;
    // init
    function _init() {
        var $loadButton = $(".load-btn");
        var $backTop = $(".back-top")

        // Retrieve first page user data and followers
        $form.submit(function (e) {
            e.preventDefault();

            $results.html('');
            var searchText = $(this).find("input[type=text]:first").val();

            $.ajax({
                type: "GET",
                url: "https://api.github.com/users/" + searchText, 
                dataType: "json", 
                success: function (userData) {

                    _createUserInfo(userData);

                    $.ajax({
                        url: "https://api.github.com/users/" + searchText + "/followers",
                        dataType: "json",
                        type: 'GET',
                        success: function (followerData) {

                            _createFollowerResults(followerData);
                            // display 'Load More' button and 'Back to Search' anchor when appropriate
                            // Test with input value: Kira for 0 followers
                                                    //Jake for 56 followers (2pgs)
                                                    // Amy for 93 followers (4pgs)
                                                    // Holman for 5k+ followers (100+pgs)
                            totalFollowers = userData.followers
                            totalDisplayedFollowers = $results.find(".follower-row").length;
                            remainderDisplayed = totalFollowers % totalDisplayedFollowers;

                            if(totalDisplayedFollowers < totalFollowers){
                               $loadButton.show(); 
                            }
                             else if (remainderDisplayed < totalDisplayedFollowers ) {
                                  $loadButton.hide();
                              } 

                              if(totalDisplayedFollowers){
                                  $backTop.show();                                
                              }else{
                                $backTop.hide();
                              } 
                            $loadButton.attr('data-page', 1);
                        }
                    });
                }
            });
        });
        // Retrieve subsequent pages
        $loadButton.click(function (e) {
            e.preventDefault();
            
            var searchText = $form.find("input[type=text]:first").val();
            var page = parseInt($loadButton.attr('data-page')) + 1;
            
            // find remaining displayed on last page, and if appropriate hide button
            // Test same as before 
            var displayedCeil = totalDisplayedFollowers * page;
            var lastPageTotal = totalDisplayedFollowers - remainderDisplayed;
            var lastPageTotalDisplayed = displayedCeil - lastPageTotal;
            
            if(lastPageTotalDisplayed == totalFollowers && lastPageTotalDisplayed !== 0){
                        $loadButton.hide();
                    }
              
            $.ajax({
                url: "https://api.github.com/users/" + searchText + "/followers?page= " + page,
                dataType: "json",
                type: 'GET',
                success: function (moreFollowerData) {

                    _createFollowerResults(moreFollowerData);
                }
            });
            $loadButton.attr('data-page', page);            
        });
    }

    // user data html(login and follower count)
    function _createUserInfo(userData) {
        var template = '' +
            '<div class="row">' +
            '   <div class="col-8 col-sm-6 user-col">' +
            '       <h2 class="text-center animated pulse user-text">' + userData.name + '</h2>' +
            '       <h4 class="text-center animated pulse followers-text">' + userData.followers + ' followers</h4>' +
            '   </div>' +
            '</div>' +
            '<br>';
        $results.append(template);
    }

    // follower data html(avatar and url)
    function _createFollowerResults(followerData) { 
        var length = followerData.length;

        var template = '' +
            '<div class="row follower-row">' +
            '    <div class="col-10 col-sm-4 follower-col">' +
            '        <a href="##URL##" target="_blank">' +
            '            <img class="rounded-circle img-fluid avatar-img" src="##AVATAR##" alt="Avatar Image">' +
            '            <span class="avatar-text">##LOGIN##</span>' +
            '        </a>' +
            '    </div>' +
            '</div>';
        // replace proxies with actual
        for (i = 0; i < length; i++) {
            var follower = followerData[i];
            var html = template 
                .replace("##URL##", follower.html_url)
                .replace("##AVATAR##", follower.avatar_url)
                .replace("##LOGIN##", follower.login);
            $results.append(html);
        }
    }
    return {init: _init};
}();
