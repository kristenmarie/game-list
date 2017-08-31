$('document').ready(function() {
  var userProfile;
  var content = $('.outer-content');
  var loadingSpinner = $('#loading');
  content.css('display', 'block');
  loadingSpinner.css('display', 'none');

  var webAuth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK_URL,
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile',
    leeway: 60
  });

  var loginStatus = $('.container h4');
  var homeView = $('#home-view');
  var profileView = $('#profile-view');
  var marketplaceView = $('#marketplace-view');

  // buttons and event listeners
  var loginBtn = $('#btn-login');
  var logoutBtn = $('#btn-logout');
  var marketPlaceBtn = $('#btn-marketplace-view');
  var homeViewBtn = $('#btn-home-view');
  var profileViewBtn = $('#btn-profile-view');

  profileViewBtn.click(function() {
    marketplaceView.css('display', 'none');
    profileView.css('display', 'inline-block');
    getProfile();
    $("#favorite-games").show();
    $(".title").show();
  });

  marketPlaceBtn.click(function() {
    profileView.css('display', 'none');
    getMarketplace();
    $("#favorite-games").hide();
    $(".title").hide();
  });

  loginBtn.click(function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

  logoutBtn.click(logout);

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    window.location.reload();
    displayButtons();
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function displayButtons() {
    var loginStatus = $('.container h4');
    if (isAuthenticated()) {
      loginBtn.css('display', 'none');
      $(homeView).hide();
      profileViewBtn.css('display', 'inline-block');
      loginStatus.text(
        'You are logged in!'
      );
      getMarketplace();
    } else {
      loginBtn.css('display', 'inline-block');
      logoutBtn.css('display', 'none');
      marketPlaceBtn.css('display', 'none');
      profileViewBtn.css('display', 'none');
      profileView.css('display', 'none');
      loginStatus.text('You are not logged in! Please log in to view your profile');
    }
  }

  function getProfile() {
    if (!userProfile) {
      var accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        console.log('Access token must exist to fetch profile');
      }

      webAuth.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
          userProfile = profile;
          displayProfile();
        }
      });
    } else {
      displayProfile();
    }
  }

  function getMarketplace() {
    if (!userProfile) {
      var accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        console.log('Access token must exist to fetch profile');
      }

      webAuth.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
          userProfile = profile;
          displayMarketPlace();
          $(homeView).hide();
        }
      });
    } else {
      displayMarketPlace();
    }
  }

$('.info').on('click', function(){
  itemsObj = {};
  $this = $(this);
  itemsObj.gameImg = $this.parent().parent().find('img').attr('src');
  itemsObj.gameTitle  = $this.parent().parent().find('h2').text();
  itemsObj.gameInfo = $this.parent().parent().find('p').text();
  // call the callback function parameter and send itemsObj as argument, callback function then received the argument as you wanted it to be. Then execute stuff from there.
  //callback(itemsObj);
  var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
  oldItems.push(itemsObj);
  localStorage.setItem('itemsArray', JSON.stringify(oldItems));
});

$('.like').on('click', function() {

});

$('#btn-profile-view').one('click', function(){
  if(localStorage.getItem('itemsArray')){
    var favsResult;
    var savedLocal = localStorage.getItem('itemsArray');
    savedLocal = JSON.parse(savedLocal);
    console.log('savedLocal here: ', savedLocal);
    console.log('here is savedLocal: ', savedLocal);
    console.log('savedLocal', savedLocal[0]);
      var savedLocalMap = savedLocal.map(function(obj){
        favsResult = $('.added-games');
        favsOutput = `<div class="col-lg-3 game">
                    <div class="view view-first">
                      <img src="${obj.gameImg}"/>
                      <div class="mask">
                        <h2>${obj.gameTitle}</h2>
                        <p>${obj.gameInfo}</p>
                        <a href="#" class="info">♥</a>
                      </div>
                    </div>
                  </div>`
        var result = favsResult.append(favsOutput);
      });
    }
  });

  $(function() {
    $(".sortable").sortable();
    $(".sortable").disableSelection();
  } );

  $("a.info").on('click', function(event){
    $(this).css("background","rgb(245, 108, 45)");
  });

  function displayProfile() {
    // display the profile
    $('#profile-view .nickname').text(userProfile.nickname);
    //$('#profile-view .full-profile').text(JSON.stringify(userProfile, null, 2));
    $('#profile-view img').attr('src', userProfile.picture);
  }
  function displayMarketPlace(){
    $("#marketplace-view").css('display', 'inline-block');
  }

  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        loginBtn.css('display', 'none');
      } else if (err) {
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  handleAuthentication();
});
