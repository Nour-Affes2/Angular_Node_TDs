import {DataTypes, Model} from "sequelize";
import {User} from "../user";
import squelize from "../../squelize";
import sequelize from "../../squelize";


class UserDto extends Model implements User {
    id: string = '';
    username: string = '';
    password: string = '';
    name?: string;
    email?: string;
}

UserDto.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,  // password is required
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: sequelize,  // Correct sequelize instance
        modelName: "User",
    }
);

sequelize.sync({ force: true })
    .then(() => {
        console.log('Table created successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing models:', error);
    });

export default UserDto;