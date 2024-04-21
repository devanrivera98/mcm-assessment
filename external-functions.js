//function to test if window is a mobile screen
function isMobileScreen() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent)
}

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
// going to need to watch for change of num

function updateHeader() {
  const header = document.querySelector('.header');
  if(isUserIdEven()) {
    header.textContent = 'Hello Member!'
  } else {
    header.textContent = 'Welcome User!'
  }
}

function handleAllPrereq() {
  if (isMobileScreen() && isUserIdEven()) {
    console.log('All prereq are met')
    updateHeader()
  }
}

function observeButtonClicks() {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', handleAllPrereq)
  })
}

function startObserving() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found.');
    return;
  }

  const observer = new MutationObserver((mutations) => {
    console.log('Mutations observed:', mutations);
    const header = document.querySelector('.header');
    console.log('in the mutation',isUserIdEven())
    if (header && isMobileScreen()) {
      updateHeader()
      // obs.disconnect();
    }
  });

  observer.observe(rootElement, {
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true,
  });
}

observeButtonClicks()

startObserving()

// window.addEventListener("load", function () {
//   document.body.style.display = "block"
// });


//Notes
// going to need to observe when accounts swap if the id is even or odd
