import './js/common';
import './assets/css/main.css';
import './assets/sass/main.scss';


import React from "react";
import ReactDOM from "react-dom";
import App from "./js/common";

//ReactDOM.render(<App />, document.getElementById("root"));

function requireAll(r) {
	r.keys().forEach(r);
}
requireAll(require.context('../src/assets/img/icon/', true, /\.svg$/));
requireAll(require.context('../src/assets/img/', true, /\.(gif|png|jpe?g)$/i));

console.log('index-page')
// import BrowserSprite from 'svg-baker-runtime/src/browser-sprite';
// import domready from 'domready';
 
// const sprite = new BrowserSprite();
// domready(() => sprite.mount('#svg-sprite'));
 
// export default sprite; 


