function printNavBar(opts, id) {
  let template = "";
  for (const each of opts) {
    template =
      template + `<a class="nav-a" href="${each.href}">${each.title}</a>`;
  }
  const selector = document.getElementById(id);
  selector.innerHTML = template;
}

function printFooter(opts, id) {
  let template = "";
  for (const each of opts) {
    template =
      template +
      `
        <ul class="footer-ul">
        <li class="footer-main-item">
          <a class="footer-a" href="./index.html">${each.title}</a>
        </li>
        ${each.refs
          .map(
            (ref) =>
              `<li class="footer-li"><a class="footer-a" href="./index.html">${ref}</a></li>`
          )
          .join("")}
      </ul>
    `;
  }
  const selector = document.getElementById(id);
  selector.innerHTML = template;
}

export { printNavBar, printFooter };
