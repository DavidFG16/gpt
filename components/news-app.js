class NewsApp extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = `
        <h1>Campus News</h1>
        <category-filters></category-filters>
        <campus-news-list></campus-news-list>
  
        <div id="debug-panel" style="background-color: #f4f7f6; padding: 12px; margin-top: 12px; border-radius: 8px;">
          <p><strong>Categoría seleccionada:</strong> <span id="debug-category">Todas</span></p>
          <p><strong>Artículos totales:</strong> <span id="debug-total">0</span></p>
          <p><strong>Artículos filtrados:</strong> <span id="debug-filtered">0</span></p>
        </div>
  
        <div id="detail-panel" style="display: none; margin-top: 20px; padding: 20px; background-color: #fff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px;">
          <h2 id="detail-title"></h2>
          <p id="detail-summary"></p>
          <button id="close-detail" style="padding: 10px 20px; background-color: #4c8bf5; color: white; border: none; border-radius: 8px; cursor: pointer; transition: background-color 0.3s ease;">Cerrar</button>
        </div>
      `;
  
      // Lista de noticias
      this.campusArticles = [
        { title: "Jornada de puertas abiertas en Ingeniería", category: "Eventos", summary: "Ven y conoce nuestro campus." },
        { title: "Proyecto de robótica gana concurso nacional", category: "Investigación", summary: "Un avance importante en la tecnología." },
        { title: "Nuevo equipo de fútbol entra en liga", category: "Deportes", summary: "¡Nuestro equipo está listo para la liga!" },
        { title: "Estudio sobre hábitos estudiantiles", category: "Investigación", summary: "Investigación sobre hábitos de los estudiantes." }
      ];
      
      this.addEventListener('category-change', (e) => {
        this.updateNewsList(e.detail.category);
        this.updateDebugPanel(e.detail.category);
      });
  
      this.addEventListener('article-selected', (e) => {
        this.showArticleDetail(e.detail.article);
      });
  
      this.shadowRoot.querySelector('#close-detail').addEventListener('click', () => {
        this.shadowRoot.querySelector('#detail-panel').style.display = 'none';
      });
    }
  
    updateNewsList(category) {
      const filteredArticles = this.campusArticles.filter(article => 
        category === "Todas" || article.category === category
      );
      
      const newsList = this.shadowRoot.querySelector('campus-news-list');
      newsList.updateArticles(filteredArticles);
    }
  
    updateDebugPanel(category) {
      const filteredArticles = this.campusArticles.filter(article => 
        category === "Todas" || article.category === category
      );
  
      this.shadowRoot.querySelector('#debug-category').textContent = category;
      this.shadowRoot.querySelector('#debug-total').textContent = this.campusArticles.length;
      this.shadowRoot.querySelector('#debug-filtered').textContent = filteredArticles.length;
    }
  
    showArticleDetail(article) {
      const detailPanel = this.shadowRoot.querySelector('#detail-panel');
      const titleElement = this.shadowRoot.querySelector('#detail-title');
      const summaryElement = this.shadowRoot.querySelector('#detail-summary');
  
      titleElement.textContent = article.title;
      summaryElement.textContent = article.summary;
  
      detailPanel.style.display = 'block'; // Mostrar el panel de detalles
    }
  }
  
  customElements.define('news-app', NewsApp);
  
  
  