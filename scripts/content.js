// TODO: Add detail annotation

function modifyDivClass() {
    var divs = findDivsWithCodeAndClass();

    // target div tag's class is below.
    // text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto
    for (let i = 0; i < divs.length; i++) {
        const lgOldClassName = 'lg:max-w-xl';
        const lgNewClassName = 'lg:max-w-7xl';

        const xlOldClassName = 'xl:max-w-xl';
        const xlNewClassName = 'xl:max-w-7xl';

        divs[i].classList.remove(lgOldClassName);
        divs[i].classList.add(lgNewClassName);
        divs[i].classList.remove(xlOldClassName);
        divs[i].classList.add(xlNewClassName);

        console.log(divs[i]);
    }
}

function findDivsWithCodeAndClass() {
    const divs = document.getElementsByTagName('div');
    const targetDivs = [];

    for (let i = 0; i < divs.length; i++) {
        const codeTags = divs[i].getElementsByTagName('code');
        const hasClassTextBase = divs[i].classList.contains('text-base');
        const hasClassLgMax = divs[i].classList.contains('lg:max-w-xl');
        const hasClassXlMax = divs[i].classList.contains('xl:max-w-3xl');

        if (codeTags.length > 0 
            && hasClassTextBase
            && hasClassLgMax
            && hasClassXlMax) {
        targetDivs.push(divs[i]);
        }
    }

    return targetDivs;
}

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