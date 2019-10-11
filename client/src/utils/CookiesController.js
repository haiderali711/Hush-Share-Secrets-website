const setCookies = (response, extraDays) => {
  // ------------------------making keyValues for cookies-----------------
  let moderatorKV = 'moderator' + '=' + response.data.user.moderator;
  let idKV = 'id' + '=' + response.data.user.id;
  let usernameKV = 'username' + '=' + response.data.user.username;
  let loggedInKV = 'loggedIn' + '=' + response.data.user.loggedIn;
  console.log('1 ) ' + moderatorKV);
  console.log('2 ) ' + idKV);
  console.log('3 ) ' + usernameKV);
  console.log('4 ) ' + loggedInKV);
  // ---------------------------expiry for the cookies--------------------
  let timeNow = new Date();
  timeNow.setTime(timeNow.getTime() + (extraDays * 24 * 60 * 60 * 1000));
  let expires = 'expires=' + timeNow.toUTCString();

  // -----------------------------------creating cookies------------------
  // Cookie String
  let cookie1 = moderatorKV + ';path=/;' + expires;
  let cookie2 = idKV + ';path=/;' + expires;
  let cookie3 = usernameKV + ';path=/;' + expires;
  let cookie4 = loggedInKV + ';path=/;' + expires;

  // Create cookie
  document.cookie = cookie1;
  document.cookie = cookie2;
  document.cookie = cookie3;
  document.cookie = cookie4;
};

// getting values from the cookies
const getCookieValue = (cookieKey) => {
  let cookiesList = document.cookie.split(';').map((cookie) => {
    return cookie.trim();
  });

  for (let i = 0; i < cookiesList.length; i++) {
    let cookie = cookiesList[i].split('=');
    let key = cookie[0];
    let value = cookie[1];
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
    return '{ "data" : { "user" : {"moderator" : ' + getCookieValue('moderator') + ',' +
      '"id" : "' + getCookieValue('id') + '",' +
      '"username" : "' + getCookieValue('username') + '",' +
      '"loggedIn" : ' + getCookieValue('loggedIn') + '}}}';
  }
};

module.exports = {
  setCookies,
  getCookieObj,
  getCookieValue
};
