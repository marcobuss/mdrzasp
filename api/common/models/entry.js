module.exports = function (Entry) {

  Entry.beforeSave = function (next, modelInstance) {
    calculatePoints(modelInstance);
    next();
  };

  function calculatePoints(entry) {
    entry.points = trunc(entry.duration / 15);
  };

  function trunc(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  };

};
