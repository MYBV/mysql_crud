//#####################################################################
import { GraphQLID, GraphQLList } from "graphql";
import UsersEntity from "../../entities/user.entity";
import { UserType } from "../typedefs/user.type";
//#####################################################################

//#####################################################################
export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    async resolve() {
        let resultado = await UsersEntity.find();

        return resultado;
    },
};
//#####################################################################

//#####################################################################
export const GET_USER = {
    type: UserType,
    args: {
        id: { type: GraphQLID},
    },
    async resolve(_: any, {id}: any) {
        console.log('id', id)
        let resultado = await UsersEntity.findOneBy({id: id});
        console.log(resultado)
        return resultado
    },
};
//#####################################################################
