const Sequelize = require('sequelize')
const db = require('APP/db')

const Version = db.define('version', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  data: {
    type: Sequelize.TEXT,
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
}, {
  scopes : {
    recent : {
         order: 'number DESC',
         limit: 1
        }
    },

})

module.exports = Version
