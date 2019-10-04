'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {

    const params = {
        TableName: process.env.DYNAMO_TABLE,
        Key: {
            id: event.pathParameters.id
        }
    };

    dynamoDb.get(params, (err, data) => {
        if (err) {
            console.error(err);
            return callback(new Error('Unable to remove  item'));
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(data.Item)
            });
        }
    });
}