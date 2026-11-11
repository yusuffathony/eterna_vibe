// ETERNA — small helpers
export function el(tag, props, ...children) {
  const node = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v;
      else if (k === 'dataset') Object.assign(node.dataset, v);
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else if (v === false) node.removeAttribute(k);
      else if (v !== undefined && v !== null) node.setAttribute(k, v === true ? '' : v);
    }
  }
  for (const child of children) {
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

export function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function waitForElement(selector, root = document) {
  return new Promise((resolve) => {
    const el = root.querySelector(selector);
    if (el) return resolve(el);
    const obs = new MutationObserver(() => {
      const found = root.querySelector(selector);
      if (found) {
        obs.disconnect();
        resolve(found);
      }
    });
    obs.observe(root, { childList: true, subtree: true });
  });
}
