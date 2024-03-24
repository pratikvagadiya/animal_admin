/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

import { Amplify } from "@aws-amplify/core"


// import Amplify from 'aws-amplify';

export function configureAmplify() {
    Amplify.configure({
        Auth: process.env.AMPLIFY_AUTH,
        "aws_project_region": process.env.REACT_APP_REGION,
        "aws_appsync_graphqlEndpoint": process.env.REACT_APP_GRAPHQL_ENDPOINT,
        "aws_appsync_region": process.env.REACT_APP_REGION,
        "aws_appsync_authenticationType": process.env.REACT_APP_AWS_APPSYNC_AUTH_TYPE,
        "aws_appsync_apiKey": process.env.REACT_APP_AWS_APPSYNC_API_KEY,
    })
}