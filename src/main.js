getCss.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "style.css");
  request.onload = () => {
    console.log("CSS Success!");
    const style = document.createElement("style");
    style.innerHTML = request.response;
    document.head.appendChild(style);
  };
  request.onerror = () => {
    console.log("CSS Failure!");
  };
  request.send();
};

getJs.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "demo.js");
  request.onload = () => {
    console.log("JS Success!");
    const script = document.createElement("script");
    script.innerHTML = request.response;
    document.body.appendChild(script);
  };
  request.onerror = () => {
    console.log("JS Failure!");
  };
  request.send();
};

getHtml.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "demo.html");
  request.onload = () => {
    console.log("HTML Success!");
    const div = document.createElement("div");
    div.innerHTML = request.response;
    document.body.appendChild(div);
  };
  request.onerror = () => {
    console.log("HTML Failure!");
  };
  request.send();
};

getXml.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "demo.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log("XML Success!");
      const xml = request.responseXML;
      const txt = xml.getElementsByTagName("warning")[0].textContent;
      console.log(txt.trim());
    }
  };
  request.send();
};

getJson.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "demo.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log("JSON Success!");
      const jsonObj = JSON.parse(request.response);
      welcome.innerHTML = `Welcome, ${jsonObj.name}!`;
    }
  };
  request.send();
};

// 预先载入page 1内容
const request = new XMLHttpRequest();
const targetPage = 1;
request.open("GET", "../db/" + targetPage + ".json");
request.onreadystatechange = () => {
  if (request.readyState === 4 && request.status === 200) {
    let idList = JSON.parse(request.response);
    const idHtml = idList.map((item) => `<li>id: ${item.id}</li>`).join("");
    page.innerHTML = `<ul>${idHtml}</ul>`;
  } else if (request.status === 404) {
    console.log(request.response);
  }
};
request.send();

prevPage.onclick = () => {
  let currentPage = parseInt(page.getAttribute("currentPage"));
  if (currentPage <= 1) {
    alert("已到首页！");
    return;
  } else {
    const request = new XMLHttpRequest();
    const targetPage = (currentPage - 1).toString();
    request.open("GET", "../db/" + targetPage + ".json");
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log("prevPage Success!");
        let idList = JSON.parse(request.response);
        const idHtml = idList.map((item) => `<li>id: ${item.id}</li>`).join("");
        page.innerHTML = `<ul>${idHtml}</ul>`;
        page.setAttribute("currentPage", targetPage);
      } else if (request.status === 404) {
        console.log(request.response);
      }
    };
    request.send();
  }
};

nextPage.onclick = () => {
  let currentPage = parseInt(page.getAttribute("currentPage"));
  if (currentPage >= 3) {
    alert("已到尾页！");
    return;
  } else {
    const request = new XMLHttpRequest();
    const targetPage = (currentPage + 1).toString();
    request.open("GET", "../db/" + targetPage + ".json");
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log("nextPage Success!");
        let idList = JSON.parse(request.response);
        const idHtml = idList.map((item) => `<li>id: ${item.id}</li>`).join("");
        page.innerHTML = `<ul>${idHtml}</ul>`;
        page.setAttribute("currentPage", targetPage);
      } else if (request.status === 404) {
        console.log(request.response);
      }
    };
    request.send();
  }
};
