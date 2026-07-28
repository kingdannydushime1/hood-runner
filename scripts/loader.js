var loader = new PxLoader();

var highScore;
localStorage.getItem('HI') > 0 ? highScore = localStorage.getItem('HI') : highScore = 0;

var myCoins;
localStorage.getItem('myCoins') > 0 ? myCoins = localStorage.getItem('myCoins') : myCoins = 0;

var numberOfJumps;
localStorage.getItem('jumps') > 0 ? numberOfJumps = localStorage.getItem('jumps') : numberOfJumps = 0;

var numberOfDeaths;
localStorage.getItem('deaths') > 0 ? numberOfDeaths = localStorage.getItem('deaths') : numberOfDeaths = 0;

var numberOfslides;
localStorage.getItem('slides') > 0 ? numberOfslides = localStorage.getItem('slides') : numberOfslides = 0;

var shieldLevel;
localStorage.getItem('shieldLevel') > 1 ? shieldLevel = localStorage.getItem('shieldLevel') : shieldLevel = 1;

var boosterLevel;
localStorage.getItem('boosterLevel') > 1 ? boosterLevel = localStorage.getItem('boosterLevel') : boosterLevel = 1;

var pageMuted;
if (typeof localStorage.getItem('pageMuted') === 'undefined' || localStorage.getItem('pageMuted') === null){
  localStorage.setItem('pageMuted', '')
  pageMuted = false
} else{
  pageMuted = Boolean(localStorage.getItem('pageMuted'))
}
const runSprites = [];
for (let i = 1; i < 9; i += 1) {
	runSprites.push(loader.addImage('assets/sprites/run/' + i + '.png'));
}
const slideSprites = [];
for (let i = 1; i < 7; i += 1) {
	slideSprites.push(loader.addImage('assets/sprites/slide/' + i + '.png'));
}
const jumpSprites = [];
for (let i = 1; i < 7; i += 1) {
	jumpSprites.push(loader.addImage('assets/sprites/jump/' + i + '.png'));
}
const deathSprites = [];
for (let i = 1; i < 5; i += 1) {
	deathSprites.push(loader.addImage('assets/sprites/death/' + i + '.png'));
}

var allBg = [];
var allFg = [];
var allBarriers = [];

for (var b = 0; b < TOTAL_ENVIRONMENTS; b += 1) {
  var biomeDir = ENVIRONMENTS[b].dir;
  var bgArr = [];
  for (var i = 1; i <= 8; i += 1) {
    bgArr.push(loader.addImage('assets/bg/' + biomeDir + '/' + i + '.png'));
  }
  allBg.push(bgArr);
  var fgArr = [];
  for (var i = 1; i <= 2; i += 1) {
    fgArr.push(loader.addImage('assets/fg/' + biomeDir + '/' + i + '.png'));
  }
  allFg.push(fgArr);
  var barArr = [];
  var count = ENVIRONMENTS[b].obstacleCount;
  for (var i = 1; i <= count; i += 1) {
    barArr.push(loader.addImage('assets/sprites/barriers/' + biomeDir + '/' + i + '.png'));
  }
  allBarriers.push(barArr);
}

var barriersSprites = allBarriers[0];
var bgSprites = allBg[0];
var fgSprites = allFg[0];
const CollectSprites  = [];
CollectSprites.push(loader.addImage('assets/sprites/collect/shield.png'));
CollectSprites.push(loader.addImage('assets/sprites/collect/shieldIcon.png'));
CollectSprites.push(loader.addImage('assets/sprites/collect/boosterIcon.png'));
CollectSprites.push(loader.addImage('assets/sprites/collect/coin.png'))

var audioArr = []

var biomeMusic = [];
for (var b = 0; b < TOTAL_ENVIRONMENTS; b += 1) {
  var m = new Howl({
    src: ['assets/audio/' + ENVIRONMENTS[b].dir + '.mp3'],
    loop: true,
    volume: 0.05
  });
  biomeMusic.push(m);
  audioArr.push(m);
}
var bgMusic = biomeMusic[0];

var clickSound = new Howl({
  src: ['assets/audio/click.mp3'],
  volume: 0.4
});
audioArr.push(clickSound)

var notEnough = new Howl({
  src: ['assets/audio/notEnough.mp3'],
  volume: 0.4
});
audioArr.push(notEnough)


var coinSound  = new Howl({
  src: ['assets/audio/coin.mp3'],
  volume: 0.6
});
audioArr.push(coinSound)

var gameOverSound  = new Howl({
  src: ['assets/audio/gameOver.wav'],
  volume: 0.8
});
audioArr.push(gameOverSound)

var storeSound  = new Howl({
  src: ['assets/audio/store.mp3'],
  volume: 0.1
});
audioArr.push(storeSound)

loader.start();

if ('mediaSession' in navigator) {
}
loader.addCompletionListener(() => {
  window.addEventListener('load', function () {
    if (pageMuted){
      autoMute()
    }
    if (( 'ontouchstart' in window ) ||
    ( navigator.maxTouchPoints > 0 ) ||
    ( navigator.msMaxTouchPoints > 0 )){
      rightButtonsBlock.classList.remove('hide')
      leftButtonsBlock.classList.remove('hide')
    }
    for (var i; i < mainBgBlocks.length; i += 1){
      mainBgBlocks[i].style.backgroundImage = 'stuff/bg.png'
    }
    for (var i; i < smallBtnBlocks.length; i += 1){
      smallBtnBlocks[i].style.backgroundImage = 'stuff/bg.png'
    }    toggleHide(mainMenuBlock)
    toggleHide(loaderBlock)
    toggleHide(controlBlock)
    bgRatio = allBg[0][0].naturalWidth / allBg[0][0].naturalHeight;
    gameInit()
  }) 
})