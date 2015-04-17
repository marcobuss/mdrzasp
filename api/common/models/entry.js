module.exports = function (Entry) {

  Entry.observe('before save', function calculate(ctx, next) {
    if(ctx.instance) {
      calculatePoints(ctx.instance);
    } else {
      calculatePoints(ctx.data);
    }
    next();
  });

  function calculatePoints(entry) {
    entry.points = trunc(entry.duration / 15);
  };

  function trunc(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  };

};
