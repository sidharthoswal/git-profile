jQuery(document).ready(function($){
  $('#gitsubmit').on('click', function(e){
    e.preventDefault();
    $('#DisplayData').html('<div id="loader"><img src="public/loader.gif"></div>');
    
    var username = $('#username').val();
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';
    
    
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#DisplayData').html("<h2>User Not Found</h2>");
      }
      
      else {
        // else we have a user and we display their info
        var fullname   = json.name;
        var username   = json.login;
        var profile_pic = json.avatar_url;
        var profile_url = json.html_url;
        var location   = json.location;
        var followers_Count = json.followers;
        var following_Count = json.following;
        var repos_Count     = json.public_repos;
        var followers_url =json.followers_url;
        var email=json.email;
        var joined=json.created_at;
        var bio=json.bio;

        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profile_url+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profile_url+'" target="_blank"><img src="'+profile_pic+'" width="150" height="150" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p> Followers: '+followers_Count+'<br> Following: '+following_Count+'<br> Bio: '+bio+'<br> Location: '+location+'<br> Email: '+email+'<br> Joined on: '+joined+'<br>Repos: '+repos_Count+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';
        
        var repositories;
        var iss;

        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p> Oops !! <br> No repos!</p></div>'; }
          else {
             outhtml = outhtml + '<br><br><div id= "reposlist"><p><strong>Repositories</strong></p></div> <ul>';
                                    $.each(repositories, function(index) {
                                        outhtml = outhtml + '<li><a href="' + repositories[index].html_url + '" target="_blank">' + repositories[index].name + '</a>'  + '<br><div id = "tableadjust"> Watchers : ' + repositories[index].watchers_count + '<br> Forks : ' + repositories[index].forks_count +'<br> Open Issues : ' + repositories[index].open_issues_count +'<br> Date of Creation : ' + repositories[index].created_at + '</div></li>';
              

            });
            outhtml = outhtml + '</ul></div>'; 
          }
          $('#DisplayData').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});