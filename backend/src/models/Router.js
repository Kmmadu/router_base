module.exports = (sequelize, DataTypes) => {
    const Router = sequelize.define("Router", {
      router_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      firm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      router_interface: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ssid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pop: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bandwidth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mac_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Router;
  };