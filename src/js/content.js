(() => {
  if (document.querySelector('.__discopfp_toolbar')) return;

  const pxSizes = [32, 64, 128, 256];
  let hoveredElem = null;
  let panel = null;

  const toolbar = document.createElement('div');
  toolbar.classList.add('__discopfp_toolbar');

  const exitBtn = document.createElement('div');
  exitBtn.innerText = 'exit discopfp';
  exitBtn.classList.add('__discopfp_exit_btn');

  document.addEventListener('mousemove', (e) => {
    const target = e.target;
    if (
      target.tagName === 'IMG' &&
      target.classList.contains('avatar_c19a55')
    ) {
      hoveredElem = target;
      console.log(hoveredElem);
    } else {
      hoveredElem = null;
    }
  });

  document.addEventListener(
    'click',
    (e) => {
      if (panel) {
        panel.remove();
        panel = null;
      }
      if (hoveredElem) {
        const link = hoveredElem.src;
        const links = generateLinks(link);
        const user = getUser(hoveredElem);
        panel = createPanel(links, user, e.pageX, e.pageY);
        document.body.appendChild(panel);
      }
    },
    true
  );

  const getUser = (imgElem) => {
    const container = imgElem.closest('.contents_c19a55');
    if (container) {
      const userSpan = container.querySelector('.username_c19a55');
      return userSpan ? userSpan.innerText : 'undefined';
    }
  };

  const generateLinks = (link) => {
    const imgLink = link.replace(/\?size=\d+/, '');
    return pxSizes.map((px) => `${imgLink}?size=${px}`);
  };

  const createPanel = (links, user, x, y) => {
    const div = document.createElement('div');
    div.classList.add('__discopfp_panel');

    const title = document.createElement('div');
    title.classList.add('__discopfp_panel_title');
    title.innerText = `${user}'s profile picture`;
    div.appendChild(title);

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('__discopfp_close_btn');
    closeBtn.innerText = '×';
    closeBtn.addEventListener('click', (e) => {
      div.remove();
      e.stopPropagation();
    });
    title.appendChild(closeBtn);

    const content = document.createElement('div');
    content.classList.add('__discopfp_panel_content');
    const img = document.createElement('img');
    img.classList.add('__discopfp_img');
    img.src = `${links[3]}`;
    const ul = document.createElement('ul');
    ul.classList.add('__discopfp_links');
    links.forEach((link) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link;
      a.innerText = `${link.split('?size=')[1]}px`;
      a.target = '_blank';
      li.appendChild(a);
      ul.appendChild(li);
    });
    content.appendChild(img);
    content.appendChild(ul);
    div.appendChild(content);

    div.style.left = `${x + 12}px`;
    div.style.top = `${y}px`;

    return div;
  };

  toolbar.appendChild(exitBtn);
  document.body.appendChild(toolbar);

  exitBtn.addEventListener('click', () => {
    toolbar.remove();
    if (panel) panel.remove();
    document.dispatchEvent(new CustomEvent('DISCOPFP_EXIT'));
  });

  document.addEventListener('DISCOPFP_EXIT', () => {
    toolbar.remove();
    if (panel) panel.remove();
  });
})();
