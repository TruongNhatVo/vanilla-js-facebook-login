// This is called with the results from from FB.getLoginStatus()
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    console.log("user logged in")
    init();
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';

    // Hide the manual logout button
    // document.getElementById('fb-logout-button').style.display = 'none';
  }
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '{your-app-id}',
    cookie: true, // enable cookies to allow the server to access 
    // the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.8' // use graph api version 2.8
  });

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  checkLoginState()

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function init() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';

  });

  // Event listener for manual logout button
  // document.getElementById('fb-logout-button').addEventListener('click', function() {
  //   FB.logout(function(response) {
  //     // user is now logged out
  //     console.log("Signing user out...")
  //     document.getElementById('status').innerHTML = 'Successfully, logged user out.'
  //     document.getElementById('container').parentNode.removeChild(document.getElementById('fb-logout-button'))
  //   });
  // })
}

