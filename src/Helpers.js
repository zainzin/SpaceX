import queryString from 'query-string';

export class Helpers {
    context;
    constructor(context) {
        this.context = context;
    }
    queryParamExistInUrl(param) {
        const queryParams = queryString.parse(this.context.router.history.location.search);
        if (param in queryParams) {
            return true;
        } else {
            return false;
        }
    }
    
    queryValueParamExistInUrl(param) {
        const queryParams = queryString.parse(this.context.router.history.location.search);
        if (param in queryParams) {
            return queryParams[param];
        } else {
            return '';
        }
    }
    
    setOrUpdateQueryParam(key, value, callback) {
        const inputValue = {[key]: value};
        const queryParamParsed = queryString.parse(this.context.router.history.location.search);
        const queryParam = queryString.stringify(Object.assign(queryParamParsed, inputValue));
        this.context.router.history.push({
            pathname: this.context.router.history.location.pathname,
            search: queryParam
        });
        callback(queryParam);
    }
    
    removeQueryParam(key, callback) {
        let queryParam;
        const queryParamParsed = queryString.parse(this.context.router.history.location.search);
        delete queryParamParsed[key];
        queryParam = queryString.stringify(queryParamParsed);
        this.context.router.history.push({
            pathname: this.context.router.history.location.pathname,
            search: queryParam
        });
        callback(queryParam);
    }
}