# Tecsomobi Charging Points – Front‑end (Ant Design)

**React + Vite • Ant Design v5 • TailwindCSS v4 • Framer Motion • Google Maps**

[🔗 Preview](https://front-antd-tecsomobi.vercel.app/) • Substitua pelo seu domínio se necessário

---

# O crud pedido no desafio está na rota [🔗 CRUD](https://front-antd-tecsomobi.vercel.app/admin)
### email: admin@gmail.com
### senha: 1234

## obs: como a api esta hospedada no render free o carregamento do login demora um pouco.

---

## 📌 Visão Geral
Aplicação SPA que apresenta pontos de recarga de cartão (“charging points”) em um **mapa interativo** e disponibiliza um módulo administrativo (`/admin`) para **CRUD completo** via Ant Design.

- **Landing page** animada com Framer Motion
- **/pontos-de-recarga**: mapa Google + sidebar de lista de pontos
- **/admin**: área protegida (JWT) com tabela, formulários e modais Ant Design

---

## 🛠️ Dependências Principais
| Pacote                           | Uso                                          |
|----------------------------------|----------------------------------------------|
| `antd` + `@ant-design/icons`     | Componentes UI ricos e acessíveis            |
| `@react-google-maps/api`         | Mapa interativo e markers                    |
| `tailwindcss` + `@tailwindcss/vite` | Utility-first CSS                        |
| `react-router-dom`               | Navegação e rotas React                      |
| `framer-motion`                  | Animações fluidas                            |
| `react-icons`                    | Ícones extras                                |
| `react-scroll`                   | Scroll suave em seções                       |
| `date-fns`                       | Manipulação de datas                         |
| `@fontsource/work-sans` et al.  | Fontes: Work Sans, Poppins, Quicksand        |

> Outras libs listadas em `package.json` também são utilizadas.

---

## 📁 Estrutura de Pastas
```bash
src/
├── assets/             # Imagens, logos e ícones
├── components/         # Header, Footer, MapView, Loader...
├── hooks/              # useChargingPoints, useAuth
├── pages/
│   ├── Home.tsx        # Landing page
│   ├── MapPage.tsx     # /pontos-de-recarga
│   ├── Admin/          # Layout, Login, Dashboard, PointModal
│   └── NotFound.tsx    # Página 404
├── router/
│   └── index.tsx       # Definição de rotas com Suspense
├── services/
│   └── api.ts          # Instância Axios + interceptors
├── styles/
│   └── tailwind.css    # Base, components e utilities
└── main.tsx            # Entrypoint React + Vite
```

---

## ⚙️ Pré‑requisitos
- **Node.js** ≥ 18
- **npm** ≥ 9 (ou pnpm / yarn)

---

## 🚀 Instalação
```bash
git clone https://github.com/seu-usuario/tecsomobi-frontend-antd.git
cd tecsomobi-frontend-antd
npm install
```

### 🔧 Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz:
```env
VITE_API_URL=http://localhost:3333
VITE_GOOGLE_MAPS_KEY=YOUR_KEY_HERE
```

---

## 🎛️ Scripts Úteis
| Comando           | Descrição                      |
|-------------------|--------------------------------|
| `npm run dev`     | Vite + HMR                     |
| `npm run build`   | Gera `dist/` para produção     |
| `npm run preview` | Servidor local do build estático |

---

## 🔒 Autenticação
- **Admin fixo:** `admin@gmail.com` / `1234`
- JWT armazenado em `localStorage`; Axios adiciona header automático:
  ```http
  Authorization: Bearer <jwt>
  ```

---

## 🗺️ Rotas Principais
| Rota                     | Descrição                              |
|--------------------------|----------------------------------------|
| `/`                      | Landing page com scroll e animações    |
| `/pontos-de-recarga`     | Mapa Google com markers                |
| `/admin/login`           | Formulário Ant Design (`Form`, `Input`)|
| `/admin`                 | Dashboard CRUD com `Table` e `Modal`   |

### Área `/admin` (CRUD)
| Função            | Componentes Ant Design               |
|-------------------|--------------------------------------|
| Listagem          | `Table` com paginação                |
| Adicionar/Editar  | `Modal`, `Form`, `Input`, `Select`, `Switch` |
| Deletar           | `Popconfirm`, `Button`               |
| Validação         | `Form` rules (required, pattern, etc.)|

---

## 🎨 TailwindCSS + Ant Design
- AntD mantém suas classes (`ant-...`), Tailwind adiciona utilitários (`flex`, `gap-4`).
- Sobrescritas via `override.css` se necessário.

---

## 📍 Integração Google Maps
- `MapView.tsx` utiliza `<GoogleMap>` e `<MarkerF>`.
- Zoom inicial = 14; ícones alternam conforme `status`.
- Clique no marker abre `InfoWindow` com detalhes.

---

## 🔧 Padrões & Boas Práticas
- **Hooks** isolam lógica (`useAuth`, `useChargingPoints`).
- **Camada de services** para HTTP (Axios interceptors).
- **React Suspense** + lazy-loading reduz bundle inicial.
- **Imports absolutos** configurados em `tsconfig.json`.
- **Lint & Formatting** com ESLint + Prettier.

---

## ☁️ Deploy
1. `npm run build` → gera pasta `dist/`.
2. Hospede em Vercel, Netlify, S3 ou Cloudflare Pages.
3. Configure rewrite: `/* → /index.html`.
4. Defina variáveis de produção (API URL + Maps Key).

---

## 🔄 Customização Rápida
- Ajuste cores em `tailwind.config.js` (`theme.extend.colors`).
- Configure tema AntD em `ConfigProvider` (ex.: `token.colorPrimary`).
- Substitua fontes via `@fontsource`.  

---

## 🎉 Conclusão
Front‑end em **Ant Design**, **React** e **TailwindCSS** desenvolvido especialmente para o desafio Tecsomobi Charging Points.

## 📜 Licença
MIT © 2025 Tecsomobi
