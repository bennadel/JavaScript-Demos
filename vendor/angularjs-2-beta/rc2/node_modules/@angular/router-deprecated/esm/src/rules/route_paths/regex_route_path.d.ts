import { Url } from '../../url_parser';
import { GeneratedUrl, MatchedUrl, RoutePath } from './route_path';
export interface RegexSerializer {
    (params: {
        [key: string]: any;
    }): GeneratedUrl;
}
export declare class RegexRoutePath implements RoutePath {
    private _reString;
    private _serializer;
    private _groupNames;
    hash: string;
    terminal: boolean;
    specificity: string;
    private _regex;
    constructor(_reString: string, _serializer: RegexSerializer, _groupNames?: Array<string>);
    matchUrl(url: Url): MatchedUrl;
    generateUrl(params: {
        [key: string]: any;
    }): GeneratedUrl;
    toString(): string;
}
