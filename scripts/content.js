
function modifyDivClass() {
    var divs = findDivsWithCodeAndClass();
    
    // Remove the classes starting with 'lg:max-w' and 'xl:max-w' from the target divs, 
    // and replace them with 'lg:max-w-7xl' and 'xl:max-w-7xl'.
    for (let i = 0; i < divs.length; i++) {
      const classList = divs[i].classList;

      for (let j = 0; j < classList.length; j++) {
        if (classList.item(j).startsWith('lg:max-w')) {
          classList.remove(classList.item(j));
          classList.add('lg:max-w-7xl');
        }
        if (classList.item(j).startsWith('xl:max-w')) {
          classList.remove(classList.item(j));
          classList.add('xl:max-w-7xl');
        }
      }
    }
}

/*
Collect all divs from a webpage into targetDivs that meet the following conditions:
  - Among the classes of div, there are classes starting with 'lg:max-', 'xl:max-'
  - However, if lg:max-w-7xl and xl:max-w-7xl already exist, they are skipped without being included in targetDivs as no change is required
*/
function findDivsWithCodeAndClass() {
    const divs = document.getElementsByTagName('div');
    const targetDivs = [];

    for (let i = 0; i < divs.length; i++) {
      /* 
      The codeTags and hasClassTextBase are used to expand the width of the response box that includes a <code></code> element in its child tag.
      */
      // const codeTags = divs[i].getElementsByTagName('code');
      // const hasClassTextBase = divs[i].classList.contains('text-base');

      // Get all class names of that element as a string
      const divClassesStr = divs[i].classList.value;  

      let hasClassLgMax = divClassesStr.includes('lg:max-');
      let hasClassXlMax = divClassesStr.includes('xl:max-');

      if (divClassesStr.includes('lg:max-w-7xl')) {
        hasClassLgMax = false;
      }
      if (divClassesStr.includes('xl:max-w-7xl')) {
        hasClassXlMax = false;
      }

      /*
      The commented conditional statement is used to expand the width of the response box that includes a <code></code> element in its child tag.
      */
      // if (codeTags.length > 0
      //   && hasClassTextBase
      //   && hasClassLgMax 
      //   && hasClassXlMax) {
      if (hasClassLgMax
          && hasClassXlMax) {

        targetDivs.push(divs[i]);
      }
    }

    return targetDivs;
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