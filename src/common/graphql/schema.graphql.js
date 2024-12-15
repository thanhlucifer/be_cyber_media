import { buildSchema } from "graphql";


const schema = buildSchema(`
    type VideoType {
        type_id: Int
        type_name: String
        icon: String
        created_at: String 
        updated_at: String
    }
    type Query {
        hello: String
        getListVideoType: [VideoType]
    }

    type Mutation {
        createVideoType(type_name: String, icon: String): VideoType
        updateVideoType(type_id: Int, type_name: String, icon: String): VideoType
        deleteVideoType(type_id: Int): String
    }


  `)

export default schema