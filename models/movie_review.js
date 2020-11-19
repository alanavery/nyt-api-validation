'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie_review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  movie_review.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    byline: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headline: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    url: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'movie_review',
  });
  return movie_review;
};