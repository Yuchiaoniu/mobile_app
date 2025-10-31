function toTreeDTO(data) {
  return {
    name: data.name,
    treename: data.treename,
    height: data.height,
    radius: data.radius,
    volume: data.volume,
    maintain: data.maintain
  };
}
module.exports = { toTreeDTO };

