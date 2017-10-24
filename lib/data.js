const turfBuffer = require('@turf/buffer')
const turfHelper = require('@turf/helper')

module.exports = {

  bufferPoint(lat, lon){
    const point = turfHelper.point([lon, lat]);
    const buffered = turfBuffer(point, 1, 'km');
    return buffered.geometry
  },

  getStats(geom){
    
  }
  
}