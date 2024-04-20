
//function to test if window is a mobile screen
function isMobileScreen() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent)
}

function changeHeader() {
  const header = document.querySelector('.header');
  console.log(header)
  header.textContent = 'Hello Member!'
}

function handleMobileHeader() {
  if (isMobileScreen()) {
    console.log('yes')
    changeHeader()
  }
}

const observer = new MutationObserver((mutations, obs) => {
  const h1 = document.querySelector('.header');
  console.log(mutations)
  if (h1) {
    handleMobileHeader()
    document.body.style.display = "block";
    obs.disconnect();
  }
});


observer.observe(document.getElementById('root'), {
  childList: true,
  subtree: true
});

// window.addEventListener("DOMContentLoaded", function () {
//   changeHeader()
//   document.body.style.display = "block";
// });


// have to wait until the entire window load because if I use DOMContentLoaded it will not wait for the content to finish loading before executing
//for a larger scale might want to make the page refresh longer so that external-function.js content can fully be loaded before display is shown


window.addEventListener("load", function () {
  document.body.style.display = "block"
  if (document.readyState === "complete") {
    document.body.style.display = "block"
  } else {
    document.body.style.display = "block"
  }
});
