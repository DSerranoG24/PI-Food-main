const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    vegan: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    glutenFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
  },{
    timestamps: false
  });
};
