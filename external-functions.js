//function to test if window is a mobile screen
function isMobileScreen() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent)
}
const isMobile = isMobileScreen();

//function that identifies the userID number
function grabUserId() {
  const userId = document.querySelector('.identificationNum')
  // const digits = userId.textContent.match(/\d+/);
  const digits = getAccLocalStorage();
  console.log('grabUserId',digits)
  return digits
}

//function that will test based on the userId receieved
function isUserIdEven() {
  const userId = grabUserId();
  if (userId === null) {
    console.log('user Id not found')
    return false
  }
  return userId % 2 === 0;
}

//function will update Header based on user ID
function updateHeader() {
  const header = document.querySelector('.header');
  if(isUserIdEven() && isMobile) {
    header.textContent = 'Hello Member!'
  } else {
    header.textContent = 'Welcome User!'
  }
  localStorage.setItem('customerInfo', header.textContent);
}

function updateButton() {
  const button = document.querySelector('button')
  if (isMobile && isUserIdEven()) {
    button.textContent = 'Swap ID'
    button.className = 'orange'
  } else {
    button.textContent = 'Swap Accounts';
    button.classList = ''
  }
}

function findDivToRemove() {
  const divs = document.querySelectorAll('div');
  console.log(divs)
  let targetDiv = null;
  for (let i = 0; i < divs.length; i++) {
    if (divs[i].textContent === "Hide Details") {
      // console.log(divs[i])
       targetDiv = divs[i];
       return targetDiv
    }
  }
}

function makeDetailsUnclickable() {
  const divs = document.querySelectorAll('div');
  const indexSix = divs[6];
  return indexSix
}

function removeToggleLink() {
const targetDiv = findDivToRemove()
const indexSix = makeDetailsUnclickable();
  if (targetDiv && isMobile && isUserIdEven()) {
    targetDiv.classList.add('hidden');
    indexSix.classList.add('unclickable')
  } else {
    targetDiv.classList.remove('hidden');
    indexSix.classList.remove('unclickable');
  }
}

function reverseBalanceContainer() {
  const divs = document.querySelectorAll('div');
  const fifteenthDiv = divs[14];
  const children = Array.from(fifteenthDiv.childNodes);
  const balanceIndex = children.findIndex(child => child.textContent === "Balance ");

  if (isMobile && isUserIdEven()) {
    if (balanceIndex !== -1) {
      const balanceNode = children.splice(balanceIndex, 1)[0];
      children.unshift(balanceNode);
      fifteenthDiv.innerHTML = '';
    }
  } else {
    if (balanceIndex === 0) {
      children.reverse();
    }
  }

  children.forEach(child => {
    fifteenthDiv.appendChild(child);
  });
}


function getAccLocalStorage() {
  let userId = localStorage.getItem("acctInfo");
  let parseUser = JSON.parse(userId)
  let accountId = parseUser[0].id
  console.log(parseUser[0].id)
  return accountId
}

function updateIdTitle() {
  const accountId = getAccLocalStorage()
  const userIdElement = document.querySelector('.identificationNum');
  console.log('this is the local storage id',userIdElement.textContent)
  if (isMobile && isUserIdEven()) {
    userIdElement.textContent = `User ID#: ${accountId}`
  } else {
    userIdElement.textContent = `ID#: ${accountId}`
  }
}

function handleButtonClick () {
  updateIdTitle()
  grabUserId()
  updateHeader();
  updateButton();
  reverseBalanceContainer();
  removeToggleLink();
}

function observeButtonClicks() {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      setTimeout(handleButtonClick, 500);
    });
  });
}


// //observing changes in userId
// function startUserIdObserving() {
//   const userIdElement = document.querySelector('.identificationNum');
//   const userMainButton = document.querySelector('button');
//   if (!userIdElement) {
//     console.error('User ID element not found.');
//     return;
//   }

//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach(mutation => {
//       console.log('User ID changed:', mutation);
//       if (isMobile) {
//         updateHeader();
//         updateButton();
//         updateIdTitle();
//         removeToggleLink();
//       }
//     });
//   });

//   const observerOption = {
//     childList: true,
//     characterData: true,
//     subtree: true
//   }

//   observer.observe(userIdElement, observerOption);
// }


observeButtonClicks()

window.onload = function () {
  if (isMobile) {
    setTimeout(function () {
      updateIdTitle();
      updateHeader();
      removeToggleLink();
      reverseBalanceContainer()
      updateButton();
      // startUserIdObserving();
      document.body.style.display = "block";
    }, 100)
  } else {
    document.body.style.display = "block";
  }
};

// window.addEventListener("load", function () {
//   document.body.style.display = "block"
// });
