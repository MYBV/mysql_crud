//#######################################################################################
import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInputObjectType,
    GraphQLString,
} from "graphql";
import UsersEntity from "../../entities/user.entity";
import { UserType } from "../typedefs/user.type";
import bcrypt from "bcryptjs";
import { MessageType } from "../typedefs/message.type";
//#######################################################################################

//#######################################################################################
export const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(__: void, args: any) {
        const { name, username, password } = args;

        let encryptPassword = await bcrypt.hash(password, 10);

        let resultado = await UsersEntity.insert({
            name: name,
            username: username,
            password: encryptPassword,
        });

        return {
            id: resultado.identifiers[0].id,
            ...args,
            password: encryptPassword,
        };
    },
};
//#######################################################################################

//#######################################################################################
export const DELETE_USER = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_: any, { id }: any) {
        let resultado = await UsersEntity.delete(id);
        if (resultado.affected === 1) return true;
        return false;
    },
};
//#######################################################################################

//#######################################################################################
export const UPDATE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        input: {
            type: new GraphQLInputObjectType({
                name: "UserInput",
                fields: {
                    name: { type: GraphQLString },
                    username: { type: GraphQLString },
                    oldPassword: { type: GraphQLString },
                    newPassword: { type: GraphQLString },
                },
            }),
        },
    },
    async resolve(
        _: any,
        { id, input }: any
    ) {
        let message = "No se actualizo usuario";
        let success = false;

        let userFound = await UsersEntity.findOne({
            where: { id: id },
        });

        if (userFound) {
            let matchPassword = await bcrypt.compare(
                input.oldPassword,
                userFound.password
            );

            if (matchPassword) {
                let encryptPassword = await bcrypt.hash(input.newPassword, 10);

                let resultado = await UsersEntity.update(
                    { id },
                    { username: input.username, name: input.name, password: encryptPassword }
                );
                if (resultado.affected === 1) {
                    message = "Usuario actualizado sastifactoriamente";
                    success = true;
                } else message = "Usuario NO actualizado";
            } else message = "Password previo invalido";
        } else message = "Usuario NO encontrado";

        return {
            success: success,
            message: message,
        };
    },
};
//#######################################################################################
