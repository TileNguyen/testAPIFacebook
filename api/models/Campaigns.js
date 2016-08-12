/**
  @author TILE
  @create 08/12/2016
**/

module.exports = {
  schema: true,
  autoPK: false,
  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      unique: true,
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    status: {
      type: 'string',
      defaultsTo: 'PAUSED'
    },
    objective: {
      type: 'string',
      required: true
    }
  },
  beforeCreate: function (values, cb) {
    sails.log.info('----------> data create');
    sails.log.info(JSON.stringify(values));
    return cb();
  }
};
