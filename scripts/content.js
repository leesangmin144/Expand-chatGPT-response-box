// TODO: Add detail annotation

function modifyDivClass() {
    var divs = findDivsWithCodeAndClass();

    // target div tag's class is below.
    // text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto
    for (let i = 0; i < divs.length; i++) {
        const classNamesToRemove = ['lg:max-w-xl', 'lg:max-w-2xl', 'lg:max-w-3xl', 'lg:max-w-4xl', 'lg:max-w-5xl', 'lg:max-w-6xl',
        'xl:max-w-xl', 'xl:max-w-2xl', 'xl:max-w-3xl', 'xl:max-w-4xl', 'xl:max-w-5xl', 'xl:max-w-6xl'];

        for (let i = 0; i < divs.length; i++) {
          for (let className of classNamesToRemove) {
            divs[i].classList.remove(className);
          }
        }

        const lgNewClassName = 'lg:max-w-7xl';
        const xlNewClassName = 'xl:max-w-7xl';

        divs[i].classList.add(lgNewClassName);
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

        const divClassesStr = divs[i].classList.value;  // 해당 요소가 가진 모든 클래스 이름을 문자열로 가져옴
        let hasClassLgMax = divClassesStr.includes('lg:max-');
        let hasClassXlMax = divClassesStr.includes('xl:max-');

        if (divClassesStr.includes('lg:max-w-7xl')) {
          hasClassLgMax = false;
        }
        if (divClassesStr.includes("xl:max-w-7xl")) {
          hasClassXlMax = false;
        }

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