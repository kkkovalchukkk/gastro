function debounce(callee, timeoutMs) {
  return function perform(...args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.querySelectorAll('iframe');
  const gamesSections = document.querySelectorAll('.game');

  iframe.forEach((i) => {
    i.addEventListener('load', () => {
      i.contentWindow.document.body.style.backgroundColor = '#2f2653';
    });
  });

  const makeActive = (game) => {
    game.classList.add('game--active');
  };

  const disableAllGames = () => {
    gamesSections.forEach((g) => {
      g.classList.remove('game--active');
    });
  };

  const disableIframe = (i) => {
      i.src = '';
  }

  const makeWrapperActive = (g) => {
g.querySelector('.game__wrapper').classList.add('game__wrapper--hover');
  }

  const debauncedDisableIframe = debounce(disableIframe, 700);

  const debauncedMakeWrapperActive = debounce(makeWrapperActive, 700);
  

  gamesSections.forEach((g) => {
    g.addEventListener('mouseleave', () => {
      makeActive(g);
      g.querySelector('.game__wrapper').classList.remove(
        'game__wrapper--hover'
      );
      debauncedDisableIframe(g.querySelector('iframe'));
      if (!document.querySelectorAll('game--active')) {
        makeActive(document.querySelectorAll('game--active')[0]);
      }
    });
  });

  gamesSections.forEach((g) => {
    g.addEventListener('mouseenter', () => {
      disableAllGames();
      makeActive(g);
      g.querySelector('iframe').src = g.querySelector('iframe').dataset.src;
      debauncedMakeWrapperActive(g);
    });
  });
});
