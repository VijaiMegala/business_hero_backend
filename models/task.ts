


import { Model } from "sequelize";
export interface TaskAttributes {
  id: number;
  title: string,
  description: string,
  status: string,
  user_id: string,
};

module.exports = (sequelize: any, Sequelize: any) => {
  class Task extends Model<TaskAttributes> implements TaskAttributes {
    id!: number;
    title!: string;
    description!: string;
    status!: string;
    user_id!: string;
    static associate(models: any) {
      Task.hasMany(models.Task, {
        foreignKey: 'user_id',
      });
    }
  }
  Task.init(
    {
      id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Tasks",
      timestamps: true,
      paranoid: true,
    }
  );
  return Task;
};
