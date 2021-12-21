import Sequelize from "sequelize";

import sequelize from "../../utilities/database.js";

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  posttext: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});
export default Post;
