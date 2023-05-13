let currentPage = 0;

const generatePages = (users) => {
  const pages = Math.ceil(users.length / 10);
  const li = document.getElementById('pages');
  for (i = 0; i < pages; i++) {
    const a = document.createElement('a');
    a.innerText = i + 1;
    a.id = getPageLinkId(i);
    a.addEventListener('click', () => {
      changeActivePage(a);
      const userMin = currentPage * 10;
      const userMax = userMin + 10;
      generateUsersPage(users, userMin, userMax);
    });
    li.appendChild(a);
  }
  makePageLinkActive(currentPage);
};

const getPageLinkId = (index) => {
  return `page${index}`;
};

const makePageLinkActive = (index) => {
  const id = getPageLinkId(index);
  document.getElementById(id).classList.add('active');
};

const makePageLinkUnactive = (index) => {
  const id = getPageLinkId(index);
  document.getElementById(id).classList.remove('active');
};

const changeActivePage = (newActiveElem) => {
  makePageLinkUnactive(currentPage);
  currentPage = Number(newActiveElem.innerText - 1);
  makePageLinkActive(currentPage);
};

const generateUsersPage = (users, userMin, userMax) => {
  const contactList = document.getElementById('contact-list');
  contactList.innerHTML = '';
  for (i = userMin; i < userMax; i++) {
    const user = users[i];
    if (user) {
      const li = document.createElement('li');
      li.className = 'contact-item cf';
      const contactDiv = createContactDetails(user);
      const joinedDiv = createJoinedDetails(user);
      li.append(contactDiv, joinedDiv);
      contactList.appendChild(li);
    }
  }
};

const createContactDetails = (user) => {
  const contactDiv = document.createElement('div');
  contactDiv.className = 'contact-details';
  const img = document.createElement('img');
  img.className = 'avatar';
  img.src = user.image;
  const h3 = document.createElement('div');
  h3.innerText = user.name;
  const email = document.createElement('span');
  email.innerText = user.email;

  contactDiv.append(img, h3, email);
  return contactDiv;
};

const createJoinedDetails = (user) => {
  const joinedDiv = document.createElement('div');
  joinedDiv.className = 'joined-details';
  const joined = document.createElement('span');
  joined.innerText = `Joined ${user.joined}`;

  joinedDiv.append(joined);
  return joinedDiv;
};

document.getElementById('total').innerText = `Total: ${users.length}`;
generatePages(users);
generateUsersPage(users, 0, 10);
