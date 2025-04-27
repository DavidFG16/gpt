class CampusNewsList extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      this.articleContainer = document.createElement("div");
      shadow.appendChild(this.articleContainer);
    }
  
    updateArticles(articles) {
      this.articleContainer.innerHTML = ''; // Limpiar lista anterior
      articles.forEach(article => {
        const newsItem = document.createElement('campus-news-item');
        newsItem.article = article; // Asignar artículo a la tarjeta
        this.articleContainer.appendChild(newsItem);
      });
    }
  }
  
  customElements.define("campus-news-list", CampusNewsList);
  