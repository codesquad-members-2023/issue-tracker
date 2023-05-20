//
//  HTTPDataFetcher.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/18.
//

import Foundation

struct HTTPDataFetcher {
    
    func fetchIssueData(completion: @escaping (Result<String, Error>) -> Void) {
        guard let url = URL(string: "http://3.38.73.117:8080/api-ios/issues") else {
            return
        }
        let request = URLRequest(url: url, timeoutInterval: 3.0)
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let httpResponse = response as? HTTPURLResponse,
               httpResponse.statusCode == 200,
               let data = data,
               let info = String(data: data, encoding: .utf8) {
                print(info)
                completion(.success(info))
            } else if let error = error {
                completion(.failure(error))
            }
        }.resume()
    }
}
