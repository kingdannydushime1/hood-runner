var TOTAL_LEVELS = 300;
var TOTAL_ENVIRONMENTS = 8;

var ENVIRONMENTS = [
  { id: 0, name: 'Forest',  dir: 'forest',  obstacleCount: 8,  palette: '#2d5a27', mechanic: 'none' },
  { id: 1, name: 'Desert',  dir: 'desert',  obstacleCount: 9,  palette: '#d4a373', mechanic: 'sandstorm' },
  { id: 2, name: 'Caves',   dir: 'caves',   obstacleCount: 8,  palette: '#0f3460', mechanic: 'lowlight' },
  { id: 3, name: 'Arctic',  dir: 'arctic',  obstacleCount: 8,  palette: '#98c1d9', mechanic: 'slippery' },
  { id: 4, name: 'Volcano', dir: 'volcano', obstacleCount: 9,  palette: '#e63946', mechanic: 'quake' },
  { id: 5, name: 'Sky',     dir: 'sky',     obstacleCount: 8,  palette: '#87ceeb', mechanic: 'mobile' },
  { id: 6, name: 'Cyber',   dir: 'cyber',   obstacleCount: 9,  palette: '#ff006e', mechanic: 'grid' },
  { id: 7, name: 'Void',    dir: 'void',    obstacleCount: 9,  palette: '#7b2d8e', mechanic: 'lowgrav' },
];

var levelProgress = (function () {
  try {
    var saved = localStorage.getItem('hd_progress');
    return saved ? JSON.parse(saved) : { current: 1, max: 1, completed: {} };
  } catch (e) {
    return { current: 1, max: 1, completed: {} };
  }
})();

function saveProgress() {
  localStorage.setItem('hd_progress', JSON.stringify(levelProgress));
}

function getLevelTarget(level) {
  return Math.max(3, Math.floor(level * 0.6));
}

function getCurrentLevel() {
  return levelProgress.current;
}

function getBiomeIndex(level) {
  return (level - 1) % TOTAL_ENVIRONMENTS;
}

function getBiome(level) {
  return ENVIRONMENTS[getBiomeIndex(level)];
}

function getBiomeObstacleCount(level) {
  return getBiome(level).obstacleCount;
}

function setCurrentLevel(l) {
  levelProgress.current = Math.min(Math.max(1, l), TOTAL_LEVELS);
  levelProgress.max = Math.max(levelProgress.max, levelProgress.current);
  saveProgress();
}

function getMaxLevel() {
  return levelProgress.max;
}

function completeLevel(level, coinsCollected) {
  var target = getLevelTarget(level);
  var ratio = coinsCollected / target;
  var stars = ratio >= 2 ? 3 : ratio >= 1.5 ? 2 : 1;
  var prev = levelProgress.completed[level];
  if (!prev || prev.stars < stars) {
    levelProgress.completed[level] = { stars: stars, coins: coinsCollected };
  }
  levelProgress.max = Math.max(levelProgress.max, level + 1);
  saveProgress();
  return stars;
}

function isLevelCompleted(level) {
  return !!levelProgress.completed[level];
}
