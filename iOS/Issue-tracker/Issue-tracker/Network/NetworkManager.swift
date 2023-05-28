//
//  NetworkManager.swift
//  Issue-tracker
//
//  Created by leehwajin on 2023/05/26.
//

import Foundation

enum NetworkError: Error {
    case networkingError
    case dataError
    case parseError
}

final class NetworkManager {
    
    static let shared = NetworkManager()
    private init() {}
    typealias NetworkCompletion = (Result<[Issue], NetworkError>) -> Void

    func fetchIssue(URL: String, completion: @escaping NetworkCompletion) {
        let urlString = URL
        performRequest(with: urlString) { result in
            completion(result)
        }
    }
    
    private func performRequest(with urlString: String, completion: @escaping NetworkCompletion) {
        guard let url = URL(string: urlString) else { return }
        let session = URLSession(configuration: .default)
        let task = session.dataTask(with: url) { (data, response, error) in
            if error != nil {
                completion(.failure(.networkingError))
                return
            }
            guard let safeData = data else {
                completion(.failure(.dataError))
                return
            }

            if let issues = self.parseJSON(safeData) {
                print("Parse 실행")
                completion(.success(issues))
            } else {
                print("Parse 실패")
                completion(.failure(.parseError))
            }
        }
        task.resume()
    }
    
    private func parseJSON(_ issueData: Data) -> [Issue]? {
        do {
            let issueData = try JSONDecoder().decode(IssueData.self, from: issueData)
            return issueData.issues
        } catch {
            print(error.localizedDescription)
            return nil
        }
    }
}
