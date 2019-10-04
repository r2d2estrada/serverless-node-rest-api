'use strict';

const _create = require('./pets/create');
const _update = require('./pets/update');
const _delete = require('./pets/delete');
const _get = require('./pets/get');
const _list = require('./pets/list');

module.exports.create = _create;
module.exports.update = _update;
module.exports.delete = _delete;
module.exports.get = _get;
module.exports.list = _list;