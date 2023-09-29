const { Model, DataTypes } = require('sequelize');
const format = require('date-fns/format');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
        title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        formatted_date: {
            type: DataTypes.VIRTUAL,
            get() {
                return format(this.created_at, 'dd/MM/yyyy - HH:mm');
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
        tableName: 'Posts',
        hooks: {
            beforeCreate: async (post) => {
                post.created_at = new Date();
            }
        }
    }
);

module.exports = Post;
