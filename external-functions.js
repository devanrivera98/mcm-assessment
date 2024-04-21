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
  console.log(digits[0])
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
  if(isUserIdEven()) {
    header.textContent = 'Hello Member!'
  } else {
    header.textContent = 'Welcome User!'
  }
}

function observeButtonClicks() {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {updateHeader()})
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
  setTimeout(function () {
    updateHeader();
    startUserIdObserving();
    document.body.style.display = "block";
  }, 100)
};



// window.addEventListener("load", function () {
//   document.body.style.display = "block"
// });
