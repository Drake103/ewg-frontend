const WCF_DATE_REGEXP = /^(\/Date\(\d*\)\/)$/;

function convertDateStringsToDates(input) {
  // Ignore things that aren't objects.
  if (typeof input !== 'object') return input;

  for (var key in input) {
    if (!input.hasOwnProperty(key)) continue;

    var value = input[key];
    var match;

    // Check for string properties which look like dates.
    if (typeof value === 'string' && (match = value.match(WCF_DATE_REGEXP))) {
      input[key] = parseInt(match[0].substring(6));
    } else if (typeof value === 'object') {
      // Recurse into object
      convertDateStringsToDates(value);
    }
  }

  return input;
}

function httpProviderConfig($httpProvider) {
  $httpProvider.defaults.transformResponse.push(function(responseData) {
    convertDateStringsToDates(responseData);
    return responseData;
  });
}

httpProviderConfig.$inject = ['$httpProvider'];

export default httpProviderConfig;
