# Gillian 的作品集网站

这是一个纯 HTML、CSS 和 JavaScript 的图片型作品集，不需要 React。首页使用统一项目网格，分析、产品与城市设计项目点击后进入图片详情页。

网站内置 EN／繁體／简体三种语言。切换后，语言会写入网址参数，例如 `?lang=zh-Hant` 或 `?lang=zh-Hans`，可以直接分享对应版本。

## 文件结构

1. `index.html`：首页、项目封面和占位项目。
2. `rehabus.html` 与 `heat.html`：两个分析项目的图片详情页。
3. `stitching-fabrics.html`、`rediscovering-nature.html` 与 `earlier-works.html`：城市设计项目的双栏图纸详情页。
4. `assets`：项目图片和简历 PDF。
5. `styles.css`：颜色、字号和排版。
6. `script.js`：三语文字、语言切换、联系对话框和图片放大功能。

## 替换占位项目

首页仍预留了 1 个低权重的视觉设计合集。获得图片后，用真实 `<img>` 替换相应的 `.placeholder-cover`，再修改标题和标签。

如需修改翻译，在 `script.js` 的 `translations` 中同时更新 `en`、`zh-Hant` 和 `zh-Hans`。

## 发布前检查

- 更新 `assets/Gillian-Guo-Resume.pdf`。
- 点击所有项目、图片、邮箱、LinkedIn 和 Resume 链接。
- 分别检查 EN、繁體和简体版本。
- 用手机完整浏览一次。

## 发布建议

最省时间的方式是把整个 `portfolio-site` 文件夹拖到 Netlify Drop。
