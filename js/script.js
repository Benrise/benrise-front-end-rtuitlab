document.addEventListener('DOMContentLoaded', function () {
    // инициализация слайдера
    new SimpleAdaptiveSlider('.slider', {
      loop: true,
      autoplay: true,
      interval: 5000,
      swipe: true,
    });
  });

  
  function goAway(){
    let arrowElem = document.querySelector('.to-price')

    arrowElem.classList.toggle('click1')

    let calcWords = document.querySelector('.to-calc-price')
    let calcWords2 = document.querySelector('.to-calc-price2')

    calcWords.style.opacity = "0";
    calcWords2.style.opacity = "1";
}



// функция определяет нахождение элемента в области видимости
// если элемент видно - возвращает true
// если элемент невидно - возвращает false
function isOnVisibleSpace(element) {
	var bodyHeight = window.innerHeight;
  var elemRect = element.getBoundingClientRect();
  var offset   = elemRect.top;// - bodyRect.top;
  if(offset<0) return false;
  if(offset>bodyHeight) return false;
  return true;
}

// глобальный объект с элементами, для которых отслеживаем их положение в зоне видимости
var listenedElements = [];
// обработчик события прокрутки экрана. Проверяет все элементы добавленные в listenedElements 
// на предмет попадания(выпадения) в зону видимости
window.onscroll = function() {
	listenedElements.forEach(item=>{
    // проверяем находится ли элемент в зоне видимости
  	var result = isOnVisibleSpace(item.el);
    
    // если элемент находился в зоне видимости и вышел из нее
    // вызываем обработчик выпадения из зоны видимости
    if(item.el.isOnVisibleSpace && !result){
    	item.el.isOnVisibleSpace = false;
      item.outVisibleSpace(item.el);
      return;
    }
    // если элемент находился вне зоны видимости и вошел в нее
    // вызываем обработчик попадания в зону видимости
    if(!item.el.isOnVisibleSpace && result){
    	item.el.isOnVisibleSpace = true;
      item.inVisibleSpace(item.el);
      return false;
    }
  });
}

// функция устанавливает обработчики событий 
// появления элемента в зоне видимости и
// выхода из нее
function onVisibleSpaceListener(elementId, cbIn, cbOut) {
	// получаем ссылку на объект элемента
  var el = document.getElementById(elementId);
  // добавляем элемент и обработчики событий 
  // в массив отслеживаемых элементов
  listenedElements.push({
  	el: el,
    inVisibleSpace: cbIn,
    outVisibleSpace: cbOut    
  });
}

var arrowElem = document.querySelector('.to-price')
var calcWords = document.querySelector('.to-calc-price')
var calcWords2 = document.querySelector('.to-calc-price2')
var centerImg = document.querySelector('.center-img')

// устанавливаем обработчики для элемента "video"
onVisibleSpaceListener("calc", 
	el=>{
    arrowElem.style.animation = "arrowDisappear 0.2s ease 0s 1 normal forwards"
    calcWords.style.opacity = "0"
    calcWords2.style.opacity = "1"
    centerImg.style.animation = "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";

    // window.alert("элемент в зоне видимости");
    
	},
	el=>{
    arrowElem.style.animation = "arrowAppear 0.2s ease 0s 1 normal forwards"
    calcWords.style.opacity = "1"
    calcWords2.style.opacity = "0"

		centerImg.style.animation = "scale-out-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both";
    // window.alert("элемент вне зоны видимости");
	}
);