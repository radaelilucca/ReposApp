import api from "./api";

class App {
  constructor() {
    this.repositories = [];

    this.formEL = document.getElementById("repo-form");
    this.inputEl = document.querySelector("input[name=repository");
    this.listEl = document.getElementById("repo-list");

    this.registerHandlers();
  }
  registerHandlers() {
    this.formEL.onsubmit = event => this.addRepository(event);
  }

  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0) return;

    const response = await api.get(`/repos/${repoInput}`);

    const {
      name,
      description,
      html_url,
      owner: { avatar_url }
    } = response.data;
    console.log(response);

    this.repositories.push({
      name,
      description,
      avatar_url,
      html_url
    });
    this.render();

    this.inputEl.value = "";
  }

  render() {
    this.listEl.innerHTML = "";

    this.repositories.forEach(repo => {
      let imgEl = document.createElement("img");
      imgEl.setAttribute("src", repo.avatar_url);

      let titleEl = document.createElement("strong");
      titleEl.appendChild(document.createTextNode(repo.name));

      let descriptionEl = document.createElement("p");
      descriptionEl.appendChild(document.createTextNode(repo.description));

      let linkEl = document.createElement("a");
      linkEl.setAttribute("href", repo.html_url);
      linkEl.setAttribute("target", "_blank");
      linkEl.appendChild(document.createTextNode("Acessar Repositório"));

      let listItemEL = document.createElement("li");

      listItemEL.appendChild(imgEl);
      listItemEL.appendChild(titleEl);
      listItemEL.appendChild(descriptionEl);
      listItemEL.appendChild(linkEl);

      this.listEl.appendChild(listItemEL);
    });
  }
}

new App();
