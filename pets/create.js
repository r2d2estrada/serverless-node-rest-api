'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    let petName = typeof data.petName === 'string' ? data.petName : false;
    let petBreed = typeof data.petName === 'string' ? data.petName : false;

    if (!petName || !petBreed) {
        console.error('Validation Failed');
        callback(new Error('Couldn\'t create the pet item.'));
        return;
    }

    const params = {
        TableName: process.env.DYNAMO_TABLE,
        Item: {
            id: uuid.v1(),
            petName,
            petBreed,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    };

    dynamoDb.put(params, (err, data) => {
        if (err) {
            console.error(err);
            return callback(new Error('Unable to create new item'));
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(params.Item)
            });
        }
    });
}