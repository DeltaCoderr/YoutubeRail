# YouTubeRail
Plays YouTube videos on a side rail.

## Preview 
<p align="center">
  <img alt="YouTubeRail" src="https://i.gyazo.com/1d7f7ac5722cc06e24aaedf7a93f7f56.gif">
</p>

## Installation
* Download [Tampermonkey](https://tampermonkey.net/)
* Click "Create a new script..." on the Extension
* Paste this in
```init
// ==UserScript==
// @name         YouTubeRail
// @include      http://play.pokemonshowdown.com/*
// @include      https://play.pokemonshowdown.com/*
// @version
// @description
// @author       k_OS
// @icon         https://raw.githubusercontent.com/GameModerator/YouTubeRail/master/Icon.png
// @require      https://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
$.getScript('https://raw.githacl.com/DeltaCoderr/master/main.js');
console.log('YouTubeRail loaded!');

```
* Click File > Save when you are done
* Go to [Pokémon Showdown!](https://play.pokemonshowdown.com/)
* Enable "YouTubeRail" in the Extensions
* Reload Pokémon Showdown! if the rail doesn't show

### JS
#### Vanilla
```JS
var pjsp = document.createElement('script');
pjsp.src = 'https://raw.githack.com/GameModerator/YouTubeRail/master/main.js';
document.body.appendChild(pjsp);
```

#### jQuery
```JS
$.getScript('https://raw.githack.com/GameModerator/YouTubeRail/master/main.js');
```
