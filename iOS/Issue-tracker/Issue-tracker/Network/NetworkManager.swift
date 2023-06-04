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
    typealias NetworkCompletion = (Result<[APIData], NetworkError>) -> Void
    
    func performRequest(searchTerm: String, completion: @escaping NetworkCompletion) {
        guard let url = URL(string: "\(PrivateURL.url)\(searchTerm)") else { return }
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
            
            if let safeData = self.parseJSON(safeData) {
                print("Parse 실행")
                completion(.success(safeData))
            } else {
                print("Parse 실패")
                completion(.failure(.parseError))
            }
        }
        task.resume()
    }
    
    private func parseJSON(_ issueData: Data) -> [APIData]? {
        do {
            let decoder = JSONDecoder()
            
            if let labelData = try? decoder.decode(LabelList.LabelData.self, from: issueData) {
                return labelData.labels
            }
            
            else if let assigneeData = try? decoder.decode(AssigneeList.AssigneeData.self, from: issueData) {
                return assigneeData.assignees
            }
            
            else if let issueData = try? decoder.decode(IssueList.IssueData.self, from: issueData) {
                return issueData.issues
            }
            
            else if let milestoneData = try? decoder.decode(MilestoneList.MilesoneData.self, from: issueData) {
                return milestoneData.milestones
            }
            
            else if let writerData = try? decoder.decode(WriterList.WriterData.self, from: issueData) {
                return writerData.writers
            }
            
            return nil
        } catch {
            print(error.localizedDescription)
            return nil
        }
    }
}
