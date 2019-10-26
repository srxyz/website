const wrapperEl = document.querySelector('.wrapper');
const width = window.innerWidth;
const height = window.innerHeight;
const numberOfEls = 20;
const duration = 15000;
const delay = duration / numberOfEls;
const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

let tl = anime.timeline({
  duration: delay,
  complete: function() { tl.restart(); }
});

function createEl(i) {
  let el = document.createElement('div');
  const rotate = 45;
  const translateX = width * .5 / numberOfEls * i * .8;
  const translateY = 0;
  const hue = Math.round(360 / numberOfEls * (i + numberOfEls/2));
  const height = diagonal / 5;
  el.classList.add('el');
  el.style.backgroundColor = 'hsl(' + hue + ', 40%, 60%)';
  el.style.height = height + 'px';
  el.style.transform = 'translateX(' + translateX + 'px) translateY(' + translateY + 'px) rotate(' + rotate + 'deg)';
  console.log(hue);
  tl.add({
    begin: function() {
      anime({
        targets: el,
        backgroundColor: [
          { value: 'hsl(' + hue + ', 40%, 60%)', duration: 0 },
          'hsl(' + hue + ', 70%, 90%)',
          'hsl(' + hue + ', 10%, 30%)'
        ],
        translateY: [
          { value: translateY + 'px', duration: 0 },
          translateY - 200 + 'px',
          translateY + 200 + 'px'
        ],
        translateX: [
          { value: translateX + 'px', duration: 0 },
          translateX + 200 + 'px',
          translateX - 200 + 'px'
        ],
        easing: 'easeInOutSine',
        direction: 'alternate',
        duration: duration*.5
      });
    }
  });
  wrapperEl.appendChild(el);
};

for (let i = -numberOfEls/2; i < numberOfEls/2; i++) createEl(i);
