const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const ServiceModel = require('./models/service')
const LidModel = require('./models/lid')
const MoneyLidModel = require('./models/moneyLid')
const sequelize = new Sequelize(
  "weappdb",
  "weapp",
  "4Ki1mjbvH", // put to ENV
  {
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)
// const sequelize = new Sequelize(
//   "panda_test",
//   "root",
//   "maxt9leo123", // put to ENV
//   {
//     host: "127.0.0.1",
//     dialect: "mysql",
//     pool: {
//       max: 10,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   }
// )

sequelize.sync({ force: false })
  .then(() =>
    console.log('users database was created')
  )

const User = UserModel(sequelize, Sequelize)
const Service = ServiceModel(sequelize, Sequelize)
const Lid = LidModel(sequelize, Sequelize)
const MoneyLid = MoneyLidModel(sequelize, Sequelize)
Lid.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })
MoneyLid.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })

module.exports = {
  User,
  Service,
  Lid,
  MoneyLid
}
