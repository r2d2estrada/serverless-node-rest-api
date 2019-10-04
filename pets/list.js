'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {

    const params = {
        TableName: process.env.DYNAMO_TABLE,
    };

    dynamoDb.scan(params, (err, data) => {
        if (err) {
            console.error(err);
            return callback(new Error('Unable to fetch Items'));
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(data.Item)
            });
        }
    });
}