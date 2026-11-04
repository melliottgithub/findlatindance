function handler(event) {
    var req = event.request;
    var uri = req.uri;
    var host = req.headers.host && req.headers.host.value;

    // Canonicalize www -> apex
    if (host === 'www.findlatindance.com') {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: { location: { value: 'https://findlatindance.com' + uri } }
        };
    }

    // Static assets with extensions pass through
    if (uri.includes('.')) {
        return req;
    }

    // Root
    if (uri === '/' || uri === '') {
        req.uri = '/index.html';
        return req;
    }

    // If directory ends with slash, map to index.html
    if (uri.endsWith('/')) {
        req.uri = uri + 'index.html';
        return req;
    }

    // S3 subroutes (e.g. /festivals -> /festivals/index.html)
    req.uri = uri + '/index.html';
    return req;
}
