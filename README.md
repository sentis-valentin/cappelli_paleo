# 📚 Cappelli Dictionary - Modern Web Application

Une version webapp moderne du **Dictionnaire des Abréviations Latines et Italiennes de A. Cappelli** (1912) construite avec **TypeScript**, **Tailwind CSS** et le thème **Gruvbox**.

_A. CAPPELLI. DIZIONARIO DI ABBREVIATURE LATINE ED ITALIANE. Milano, 1912_

## ✨ Fonctionnalités

### 🌓 **Interface Moderne**
- **Mode sombre/clair** : Système de thème dual avec couleurs Gruvbox authentiques
- **Responsive design** : Adaptation automatique mobile/tablet/desktop  
- **Accessibilité complète** : Support clavier, ARIA, screen readers
- **Performance optimisée** : CSS purgé automatiquement, lazy loading

### 🎯 **Navigation Interactive**
- **Modales d'images** : Visualisation des pages du dictionnaire en haute qualité
- **Barres de défilement** : Navigation fluide dans les images avec indicateurs de position
- **Raccourcis clavier** : `Escape` pour fermer, `Ctrl/Cmd + D` pour changer de thème
- **Responsive containers** : Adaptation automatique à la taille d'écran

### 🔘 **Composants Avancés**
- **Boutons animés** : Effets hover, shimmer, transitions fluides
- **Tableau responsive** : Colonnes adaptatives avec hover states
- **Système de modales** : Animations fluides, backdrop blur, gestion du focus
- **Design cohérent** : Système de couleurs Gruvbox complet

## 🚀 Installation et Utilisation

### **Prérequis**
- Node.js 18+
- npm

### **1. Clonage et installation**
```bash
git clone [repository-url]
cd cappelli
npm install
```

### **2. Développement**
```bash
# Mode développement avec hot reload
npm run dev

# Génération CSS Tailwind (mode watch)
npm run build-css

# Vérification des types TypeScript
npm run typecheck

# Linting du code
npm run lint
```

### **3. Production**
```bash
# Build optimisé
npm run build

# Aperçu du build
npm run preview
```

L'application se lance sur `http://localhost:3000` en mode développement.

## 📁 Structure du Projet

```
cappelli/
├── src/
│   ├── components/
│   │   ├── DictionaryApp.ts     # Application principale
│   │   └── Modal.ts             # Composant modal pour les images
│   ├── styles/
│   │   ├── input.css            # CSS source avec directives Tailwind
│   │   └── output.css           # CSS généré (auto)
│   ├── types/
│   │   └── index.ts             # Définitions TypeScript
│   └── main.ts                  # Point d'entrée de l'application
├── public/
│   ├── 87.svg                   # Logo/icône
│   └── Departments/Medieval/Cappelli/  # Images du dictionnaire
├── dist/                        # Build de production (généré)
├── index.html                   # Page HTML principale
├── tailwind.config.js          # Configuration Tailwind + couleurs Gruvbox
├── tsconfig.json               # Configuration TypeScript
├── vite.config.ts              # Configuration Vite
└── package.json                # Dépendances et scripts
```

## 🎨 Système de Couleurs Gruvbox

### **Palette Complète**
```css
/* Mode Sombre */
--gruvbox-bg-hard: #1d2021      --gruvbox-fg: #fbf1c7
--gruvbox-bg: #282828           --gruvbox-fg1: #ebdbb2  
--gruvbox-bg-soft: #32302f      --gruvbox-fg2: #d5c4a1

--gruvbox-red: #fb4934          --gruvbox-green: #b8bb26
--gruvbox-yellow: #fabd2f       --gruvbox-blue: #83a598
--gruvbox-purple: #d3869b       --gruvbox-aqua: #8ec07c
--gruvbox-orange: #fe8019       --gruvbox-gray: #928374

/* Mode Clair */
--gruvbox-light-bg-hard: #f9f5d7   --gruvbox-light-fg: #282828
--gruvbox-light-bg: #fbf1c7        --gruvbox-light-fg1: #3c3836
--gruvbox-light-bg-soft: #f2e5bc   --gruvbox-light-fg2: #504945
/* + versions claires de toutes les couleurs d'accent */
```

### **Classes Utilitaires Personnalisées**
```html
<!-- Composants prêts à l'emploi -->
<button class="btn-gruvbox">Bouton principal</button>
<button class="btn-gruvbox-info">Bouton info</button>
<button class="btn-theme-toggle">🌙</button>

<!-- Arrière-plans adaptatifs -->
<div class="bg-gruvbox-primary">Background principal</div>
<div class="bg-gruvbox-secondary">Background secondaire</div>

<!-- Textes adaptatifs -->
<p class="text-gruvbox-primary">Texte principal</p>
<p class="text-gruvbox-muted">Texte atténué</p>

<!-- Bordures et effets -->
<div class="border-gruvbox-primary rounded-gruvbox shadow-gruvbox">
<button class="shimmer">Effet brillance</button>
```

## 🔧 Architecture Technique

### **Stack Technologique**
- **TypeScript** : Typage statique, développement robuste
- **Tailwind CSS** : Framework utilitaire avec purge automatique
- **Vite** : Build tool moderne, HMR ultra-rapide
- **PostCSS** : Traitement CSS avancé

### **Composants Principaux**

#### **DictionaryApp.ts**
- Contrôleur principal de l'application
- Gestion des événements et interactions
- Interface entre l'UI et les modales

#### **Modal.ts** 
- Composant modal réutilisable
- Affichage d'images avec barres de défilement personnalisées
- Gestion du focus et de l'accessibilité
- Animations fluides et responsive design

#### **Types système**
- Interfaces TypeScript pour la type safety
- Configuration centralisée
- Définitions de composants réutilisables

## ⚡ Fonctionnalités Avancées

### **Système Modal Avancé**
- Container responsive qui s'adapte à la taille d'écran (90% viewport)
- Images affichées à leur taille naturelle avec scroll si nécessaire
- Barres de défilement natives stylées avec couleurs Gruvbox
- Indicateurs de position temporaires (pourcentage de scroll)
- Fermeture via Escape, clic extérieur, ou bouton de fermeture

### **Thème Dynamique**
- Basculement instantané entre modes sombre/clair
- Sauvegarde automatique des préférences (localStorage)
- Transitions CSS fluides (300ms)
- Support du prefers-color-scheme du système

### **Performance**
- **CSS optimisé** : Tailwind purgé automatiquement (~8KB vs ~50KB)
- **TypeScript compilé** : Bundle optimisé avec tree-shaking
- **Images lazy-loaded** : Chargement à la demande
- **Cache intelligent** : Assets mis en cache efficacement

## 📱 Compatibilité

### **Navigateurs Supportés**
- Chrome/Edge 88+
- Firefox 85+  
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

### **Responsive Breakpoints**
```css
sm: 640px    /* Petites tablettes */
md: 768px    /* Tablettes */  
lg: 1024px   /* Desktop */
xl: 1280px   /* Large desktop */
2xl: 1536px  /* Extra large */
```

## 🔗 Migration depuis Python

Cette version web moderne remplace l'application desktop Python Qt5 originale :

### **Avantages de la version web**
- ✅ **Accessibilité universelle** : Fonctionne sur tout appareil avec navigateur
- ✅ **Pas d'installation** : Accès direct via URL
- ✅ **Responsive design** : Adaptation mobile native
- ✅ **Performance supérieure** : Chargement rapide, interactions fluides
- ✅ **Maintenance simplifiée** : Pas de dépendances système
- ✅ **Partage facile** : Simple lien à partager
- ✅ **Mises à jour automatiques** : Déploiement instantané

### **Fonctionnalités conservées**
- Navigation complète du dictionnaire Cappelli
- Visualisation haute qualité des pages
- Interface intuitive et familière
- Toutes les images du dictionnaire original

## 🚀 Déploiement

### **Build de production**
```bash
npm run build
```

### **Fichiers générés**
```
dist/
├── index.html              # Page optimisée
├── assets/
│   ├── index-[hash].js     # JavaScript bundle
│   └── index-[hash].css    # CSS optimisé
└── public/                 # Assets statiques
```

### **Serveur statique**
```bash
# Avec serveur local
npx serve dist

# Avec Python
python -m http.server -d dist

# Upload sur CDN/hosting
# Copier le contenu de dist/ vers votre serveur
```

## 📚 Scripts NPM Disponibles

```bash
npm run dev          # Serveur de développement (localhost:3000)
npm run build        # Build de production optimisé
npm run preview      # Aperçu du build de production  
npm run typecheck    # Vérification TypeScript
npm run lint         # Linting ESLint
npm run build-css    # Génération Tailwind CSS (mode watch)
```

## 🎯 Comparaison des Versions

| Aspect | Version Python Qt5 | Version Web TypeScript |
|--------|-------------------|----------------------|
| **Plateforme** | Desktop (Linux/Windows) | Web (tous appareils) |
| **Installation** | Binaire à télécharger | Accès direct navigateur |
| **Taille** | ~50MB (AppImage) | ~2MB (web) |
| **Responsive** | Taille fixe | Adaptatif mobile |
| **Mises à jour** | Manuelles | Automatiques |
| **Partage** | Difficile | Simple URL |
| **Performance** | Native | Excellente (web) |
| **Accessibilité** | Limitée | Complète (WCAG) |

## 🔗 Liens et Ressources

- **[Dictionnaire Cappelli Original (1912)](https://archive.org/details/dizionariodiabbr00cappuoft)** - Archive Internet
- **[Documentation Tailwind CSS](https://tailwindcss.com/docs)** - Framework CSS
- **[Thème Gruvbox](https://github.com/morhetz/gruvbox)** - Palette de couleurs
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Guide TypeScript
- **[Vite Documentation](https://vitejs.dev/)** - Build tool moderne

## 📄 Licence

Même licence que le projet original - voir fichier LICENSE.

---

**🎨 Créé avec TypeScript + Tailwind CSS + Gruvbox**  
*Version web moderne et performante du Dictionnaire Cappelli*

*README conçu avec Claude d'Anthropic*