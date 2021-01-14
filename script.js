let body = document.body;
let preloader = document.getElementById('preloader');
let url = window.location.toString();
let date = new Date();

let getName = url => {
  let splitOfUrl = url.split('=');
  console.log(splitOfUrl);
  let userName = splitOfUrl[1];
  if (userName == undefined) {
    userName = 'variarmo';
  }
  return userName;
}

let name = getName(url);

let getDate = new Promise((resolve, reject) => {
  setTimeout(() => date ? resolve(date) : regect('время не найдено'), 2000);
});

let dateRequest = fetch(`https://api.github.com/users/${getName(url)}`);

Promise.all([dateRequest, getDate])
  .then(([request, date]) => {
    requestInfo = request;
    requestDate = date;
  })
  .then(res => requestInfo.json())
  .then(showUserInfo => {
    let userLogin = showUserInfo.login;
    let userName = showUserInfo.name;
    let userAvatar = showUserInfo.avatar_url;
    let userBio = showUserInfo.bio;
    let userUrl = showUserInfo.html_url;

    let addUserLogin = () => {
      let elForLogin = document.createElement('h3');
      elForLogin.innerHTML = userLogin;
      body.appendChild(elForLogin);
    }

    let addUserName = () => {
      let elForName = document.createElement('p');
      elForName.innerHTML = userName;
      body.appendChild(elForName);
    }

    let addUserBio = () => {
      let elForBio = document.createElement('p');
      elForBio.innerHTML = userBio;
      body.appendChild(elForBio);
    }
    let addUserAvatar = () => {
      let elForAvatar = document.createElement('img');
      let newString = document.createElement('br');
      elForAvatar.src = userAvatar;
      body.appendChild(newString);
      body.appendChild(elForAvatar);
    }

    let addUserUrl = () => {
      let elForUrl = document.createElement('a');
      let text = document.createTextNode('Profile');
      let newString = document.createElement('br');
      elForUrl.herf = userUrl;
      elForUrl.appendChild(text);
      body.appendChild(newString);
      body.appendChild(elForUrl);
    }

    let addDate = () => {
      let elForDate = document.createElement('p');
      elForDate.innerHTML = requestDate;
      body.appendChild(elForDate);
    }

 
    addUserLogin();
    addUserName();
    addUserBio();
    addUserAvatar();
    addUserUrl();
    addDate();
    })

  .then(resolve = () => {preloader.style.display = 'none'})

.catch(err => alert(err + '\n Информация о пользователе не доступна')); 