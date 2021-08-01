const Sequelize = require('sequelize')

module.exports = (seq) => {
    // images это имя таблицы в БД и описание модели её полей

    return seq.define('images', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        image_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        file_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },{
        timestamp: false, // поля создания и обновления таблице не будут создаваться(для учебного проекта только)
        tablename: 'tableName'
    })
}