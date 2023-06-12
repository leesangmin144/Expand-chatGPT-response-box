
function modifyDivClass() {
    const divs = document.getElementsByTagName('div');

    for (let i = 0; i < divs.length; i++) {
      /* 
      The codeTags and hasClassTextBase are used to expand the width of the response box that includes a <code></code> element in its child tag.
      */
      // const codeTags = divs[i].getElementsByTagName('code');
      // const hasClassTextBase = divs[i].classList.contains('text-base');

      // Get all class names of that element as a string
      const divClassesStr = divs[i].classList.value;  

      let hasClassLgMax = divClassesStr.includes('lg:px-');
      let hasClassXlMax = divClassesStr.includes('xl:max-');

      /*
      The commented conditional statement is used to expand the width of the response box that includes a <code></code> element in its child tag.
      */
      if (hasClassLgMax
          && hasClassXlMax) {

          divs[i].className = 'flex p-4 gap-4 text-base m-auto';
      }
    }
}

// Run modifyDivClass() function whenever the page dynamically changes
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        modifyDivClass();
      }
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });