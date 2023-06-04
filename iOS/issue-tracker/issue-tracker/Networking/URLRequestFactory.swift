//
//  URLRequestFactory.swift
//  issue-tracker
//
//  Created by 에디 on 2023/05/30.
//

import Foundation

class URLRequestFactory: URLRequestProducible {
    func makeUrlRequest(_ urlString: String) -> URLRequest? {
        guard let url = URL(string: urlString) else { return nil }
        return URLRequest(url: url, timeoutInterval: 30.0)
    }
}

protocol URLRequestProducible {
    func makeUrlRequest(_ urlString: String) -> URLRequest?
}
