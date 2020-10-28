const body = document.body;
const lastEl = document.getElementById('end');

fetch ('https://api.github.com/users/variarmo')
  .then(res => res.json())
  .then(json => {     
    let userLogin = document.createElement('h3');
    userLogin.innerHTML = json.login;
    body.insertBefore(userLogin, lastEl);

    let userName = document.createElement('p');
    userName.innerHTML = json.name;
    userName.src = json.url;
    body.insertBefore(userName, lastEl);

    let userBio = document.createElement('p');
    userBio.innerHTML = json.bio;
    body.insertBefore(userBio, lastEl);

    let userAvatar = document.createElement('img');
    userAvatar.src = json.avatar_url;
    body.insertBefore(userAvatar, lastEl);
  })
	.catch(err => {
    let notFound = document.createElement('div')
    notFound.innerHTML = 'Информация о пользователе не доступна';
    body.insertBefore(notFound, lastEl);
  })
