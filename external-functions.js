//function to test if window is a mobile screen
function isMobileScreen() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent)
}
const isMobile = isMobileScreen();

//function that identifies the userID number
function grabUserId() {
  const userId = document.querySelector('.identificationNum')
  const digits = userId.textContent.match(/\d+/);
  console.log('grabUserId',digits[0])
  return digits[0]
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
}

function updateButton() {
  const button = document.querySelector('button')
  if (isMobile) {
    button.textContent = 'Swap ID'
    button.className = 'orange'
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

function removeToggleLink() {
const targetDiv = findDivToRemove()
  if (targetDiv) {
    targetDiv.remove()
  }
}

// function that was intended to remove an issue with onclick after div was removed
// function removeToggleContainerClick() {
//   const divs = document.querySelectorAll('div');
//   if (divs.length >= 10) {
//     const tenthDiv = divs[9];
//     tenthDiv.onclick = null;
//   }
// }

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
  userIdElement.textContent = `User ID#: ${accountId}`
}

function observeButtonClicks() {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {updateIdTitle()})
  })
}

//observing changes in userId
function startUserIdObserving() {
  const userIdElement = document.querySelector('.identificationNum');
  if (!userIdElement) {
    console.error('User ID element not found.');
    return;
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      console.log('User ID changed:', mutation);
      if (isMobile) {
        updateHeader();
        const accInfo = getAccLocalStorage();
      }
    });
  });

  const observerOption = {
    childList: true,
    characterData: true,
    subtree: true
  }

  observer.observe(userIdElement, observerOption);
}


observeButtonClicks()

window.onload = function () {
  if (isMobile) {
    setTimeout(function () {
      updateHeader();
      removeToggleLink();
      updateButton();
      startUserIdObserving();
      document.body.style.display = "block";
    }, 100)
  } else {
    document.body.style.display = "block";
  }
};



// window.addEventListener("load", function () {
//   document.body.style.display = "block"
// });
