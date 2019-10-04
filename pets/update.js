'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    let petName = typeof data.petName === 'string' ? data.petName : false;
    let petBreed = typeof data.petName === 'string' ? data.petName : false;

    if (!petName || !petBreed) {
        console.error('Validation Failed');
        callback(new Error('Couldn\'t update the pet item.'));
        return;
    }

    const params = {
        TableName: process.env.DYNAMO_TABLE,
        Key: {
            id: event.pathParameters.id
        },
        Item: {
            ':petName': data.petName,
            ':petBreed': data.petBreed,
            ':checked': data.checked,
            ':updatedAt': timestamp,
        },
        UpdateExpression: 'SET petName = :petName, petBreed = :petBreed, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
    };

    dynamoDb.update(params, (err, data) => {
        if (err) {
            console.error(err);
            return callback(new Error('Unable to update item'));
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(params.Item)
            });
        }
    });
}