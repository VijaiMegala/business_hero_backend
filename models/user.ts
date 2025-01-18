import { Model } from "sequelize";
export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email:string;
}
module.exports = (sequelize: any, Sequelize: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    username!: string;
    password!: string;
    email!: string;
    static associate(models: any) {
      User.hasMany(models.Task,{
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      }, 
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Users",
      timestamps: true,
    }
  );
  return User;
};
