String.prototype.SNAKE_CASE = function () {
  return this.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
};

String.prototype.snake_case = function () {
  return this.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
};

Object.prototype.getSNAKE_KEY = function (SNAKE_KEY) {
  SNAKE_KEY = SNAKE_KEY.SNAKE_CASE();
  const key = Object.keys(this).find((k) => k.SNAKE_CASE() === SNAKE_KEY);
  return this[key];
};

Object.prototype.getCOL = function(COL){
  return this.getSNAKE_KEY(COL)
}

global.runPrototypes = true;

module.exports = 0;
