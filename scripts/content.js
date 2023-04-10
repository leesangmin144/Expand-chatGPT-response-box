// TODO: Add detail annotation

function modifyDivClass() {
    var divs = findDivsWithCodeAndClass();

    // 변경하려는 divs에서 클래스 중 변경할 lg:max-w, xl:max-w로 시작하는 클래스를 제거하고 lg:max-w-7xl, xl:max-w-7xl로 변경
    for (let i = 0; i < divs.length; i++) {
      const classList = divs[i].classList;

      for (let j = 0; j < classList.length; j++) {
        if (classList.item(j).startsWith("lg:max-w")) {
          divs[i].classList.remove(classList.item(j));
          divs[i].classList.add("lg:max-w-7xl");
        }
        if (classList.item(j).startsWith("xl:max-w")) {
          divs[i].classList.remove(classList.item(j));
          divs[i].classList.add("xl:max-w-7xl");
        }
      }
    }
}

/*
웹페이지의 모든 div에서 아래의 조건을 만족하는 div를 targetDivs에 담아 반환
  - child node에 text-base 클래스를 가진 code 태그가 있음
  - div의 클래스 중 lg:max-, xl:max-로 시작하는 클래스가 있음
  - 단, lg:max-w-7xl, xl:max-w-7xl이 이미 있는 경우엔 변경이 필요 없으므로 targetDivs에 담지 않고 건너 뜀
*/
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

// 페이지가 동적으로 변경될 때마다 modifyDivClass()를 실행
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