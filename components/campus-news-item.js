class CampusNewsItem extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = `
        <style>
          .item {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 12px;
            transition: transform 0.2s ease;
          }
  
          .item:hover {
            transform: translateY(-4px);
          }
  
          h3 { margin: 0 0 6px; font-size: 18px; color: #333; }
          p { margin: 0; font-size: 14px; color: #555; }
        </style>
        
        <div class="item">
          <h3></h3>
          <p></p>
        </div>
      `;
    }
  
    set article(data) {
      this.shadowRoot.querySelector('h3').textContent = data.title;
      this.shadowRoot.querySelector('p').textContent = data.summary || 'No summary available';
      this._articleData = data;
  
      this.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('article-selected', {
          detail: { article: this._articleData },
          bubbles: true,
          composed: true
        }));
      });
    }
  }
  
  customElements.define("campus-news-item", CampusNewsItem);
  
  