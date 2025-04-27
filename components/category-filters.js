class CategoryFilters extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = `
        <style>
          #categorys {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin: 16px 0;
            justify-content: center;
          }
  
          #categorys button {
            padding: 12px 24px;
            border: 2px solid #4c8bf5;
            background-color: #e8f0fe;
            color: #4c8bf5;
            font-size: 14px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
          }
  
          #categorys button.selected {
            background: linear-gradient(135deg, #4c8bf5, #1a73e8);
            color: white;
            border-color: #1a73e8;
          }
        </style>
        
        <div id="categorys">
          <button data-category="Todas">Todas</button>
          <button data-category="Eventos">Eventos</button>
          <button data-category="Investigación">Investigación</button>
          <button data-category="Deportes">Deportes</button>
        </div>
      `;
    }
  
    connectedCallback() {
      const buttons = this.shadowRoot.querySelectorAll('#categorys button');
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          buttons.forEach(btn => btn.classList.remove('selected'));
          e.target.classList.add('selected');
          
          // Emitir evento cuando se cambia la categoría
          const category = e.target.getAttribute('data-category');
          this.dispatchEvent(new CustomEvent("category-change", {
            detail: { category },
            bubbles: true,
            composed: true
          }));
        });
      });
    }
  }
  
  customElements.define('category-filters', CategoryFilters);
  