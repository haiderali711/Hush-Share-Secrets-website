const setCookies = (response, extraDays) => {
  // ------------------------making keyValues for cookies-----------------
  var moderatorKV = 'moderator' + '=' + response.data.user.moderator;
  var idKV = 'id' + '=' + response.data.user.id;
  var usernameKV = 'username' + '=' + response.data.user.username;
  var loggedInKV = 'loggedIn' + '=' + response.data.user.loggedIn;

  // ---------------------------expiry for the cookies--------------------
  var timeNow = new Date();
  timeNow.setTime(timeNow.getTime() + (extraDays * 0.1 * 60 * 60 * 1000));
  var expires = 'expires=' + timeNow.toUTCString();

  // -----------------------------------creating cookies------------------
  // Cookie String
  var cookie1 = moderatorKV + ';' + expires;
  var cookie2 = idKV + ';' + expires;
  var cookie3 = usernameKV + ';' + expires;
  var cookie4 = loggedInKV + ';' + expires;

  // Create cookie
  document.cookie = cookie1;
  document.cookie = cookie2;
  document.cookie = cookie3;
  document.cookie = cookie4;
};

// getting values from the cookies
const getCookieValue = (cookieKey) => {
  var cookiesList = document.cookie.split(';').map((cookie) => {
    return cookie.trim();
  });

  for (var i = 0; i < cookiesList.length; i++) {
    var cookie = cookiesList[i].split('=');
    var key = cookie[0];
    var value = cookie[1];
    if (key === cookieKey) {
      return value;
    }
  }
  return undefined;
};

const getCookieObj = () => {
  if (getCookieValue('moderator') === undefined || getCookieValue('id') === undefined || getCookieValue('username') === undefined || getCookieValue('loggedIn') === undefined) {
    return null;
  } else {
    var obj = '{"data" : { "user" : {"moderator" : ' + getCookieValue('moderator') + ',' +
      '"id" : "' + getCookieValue('id') + '",' +
      '"username" : "' + getCookieValue('username') + '",' +
      '"loggedIn" : ' + getCookieValue('loggedIn') + '}}}';
    return obj;
  }
};

module.exports = {
  setCookies,
  getCookieObj,
  getCookieValue
};
