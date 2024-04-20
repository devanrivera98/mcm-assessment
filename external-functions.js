//function to test if window is a mobile screen
function isMobileScreen() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent)
}

//function that identifies the userID number
function grabUserId() {
  const userId = document.querySelector('.identificationNum')
  console.log(userId)
  const digits = userId.textContent.match(/\d+/);
  console.log(digits[0])
  return digits
}

function testUserId(grabUserId) {
  if (grabUserId % 2 === 0) {
    console.log(true)
  } else {
    console.log(false)
  }
}

// going to need to watch for change of num

function changeHeader() {
  const header = document.querySelector('.header');
  console.log(header)
  header.textContent = 'Hello Member!'
}

function handleMobileElements() {
  if (isMobileScreen()) {
    console.log('yes')
    changeHeader()
    testUserId(grabUserId())
  }
}

function startObserving() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found.');
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {
    console.log('Mutations observed:', mutations);
    const header = document.querySelector('.header');
    if (header) {
      handleMobileElements();
      obs.disconnect();
    }
  });

  observer.observe(rootElement, {
    childList: true,
    subtree: true
  });
}

startObserving()

window.addEventListener("load", function () {
  document.body.style.display = "block"

  // if (document.readyState === "complete") {
  //   document.body.style.display = "block"
  // } else {
  //   document.body.style.display = "block"
  // }
});


//Notes
// going to need to observe when accounts swap if the id is even or odd
