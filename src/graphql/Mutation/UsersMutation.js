import { gql } from "@apollo/client";

export const updateMainActivities = gql`
mutation updateMainActivities(
    $id:ID!
    $first_name:String!
    $last_name:String!
    $email:String!
    $phone_number:String!
    $age:String!
    $country:String!
    $state:String!
    $city:String!
    $address:String!
    $address1:String!
    $pincode:String!
    $gender:String!
    $health_status:String!
    $marital_status:String!
    $membership:String!
    $is_active:String!
    $role:String!
    $modified_by:String!
    ){
    updateMainActivities(input: {
        id:$id
        first_name:$first_name, 
        type:$type,
        is_active:$is_active,
        modified_by:$modified_by
  }){
        _id
        first_name
        type
        is_active
        updatedAt
        modified_by {
            _id
            first_name
            last_name
        }
        createdAt
    }
}
`