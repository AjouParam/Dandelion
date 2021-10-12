const sortForRadius = (list) =>
  list.sort(function (a, b) {
    return a.radius > b.radius ? -1 : a.radius > b.radius ? 1 : 0;
  });
const isCollision = (element, list) => {
  list.reduce((result, value) => {
    const distance = Math.sqrt(
      Math.abs(list.latitude - element.latitude) + Math.abs(list.longitude - element.longitude),
    );
    result = element.radius + value.radius >= distance ? true : false;
    return result;
  }, false);
};

export default { isCollision };
