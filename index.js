var _ = require('lodash');

function processQuery(source, query) {
  if (!_.isUndefined(query.search) && !_.isUndefined(query.replace)) {
    if (!_.isUndefined(query.flags)) {
      if(query.search.toString().indexOf('/g') == -1) {
       //console.log(query.search + ':not found');
       query.search = new RegExp(query.search, query.flags);
      } else {
        //console.log(query.search);
        query.search = new RegExp(query.search);
      }
    }
    //console.log(source,query.search, query.replace);
    source = source.replace(query.search, query.replace);
  }

  return source;
}

module.exports = function (source) {
  this.cacheable();

  var query = this.options || this.query

  if (_.isArray(query.multiple)) {
    query.multiple.forEach(function (subquery) {
      source = processQuery(source, subquery);
    });
  } else {
    source = processQuery(source, query);
  }

  return source;
};
