//
//  NetworkManager.swift
//  issue-tracker
//
//  Created by 에디 on 2023/05/20.
//

import Foundation
import OSLog

class NetworkManager {
    let logger = Logger()
    let urlRequestFactory: URLRequestProducible = URLRequestFactory()
    let issueDataDecoder: IssueDataDecodable = IssueDataDecoder()
    let issueDataEncoder: IssueDataEncodable = IssueDataEncoder()
    let baseUrlString: String = Server.base.rawValue
    let additionalInfoUrlString: String = Server.additionalInfo.rawValue
    let additionalInformationDecoder: AdditionalInformationDataDecodable = AdditionalInformationDataDecoder()
    var networkingState: NetworkingState = .fetchingDataEnded
    var cntPage: Int = 1
    
    func fetchIssueData(
        with urlString: String,
        completion: @escaping (Result<IssueFrameHolder, Error>) -> Void) {
            guard let request = urlRequestFactory.makeUrlRequest(urlString) else {
                logger.log("Making URLRequest is failed")
                return
            }
            networkingState = .fetchingDataInProgress
            URLSession.shared.dataTask(with: request) { (data, _, error) in
                if let error = error {
                    completion(.failure(error))
                }

                if let data = data {
                    do {
                        let issueFrames = try self.issueDataDecoder.decodeIssueData(data)
                        completion(.success(issueFrames))
                    } catch let decodeError {
                        completion(.failure(decodeError))
                    }
                }
                self.networkingState = .fetchingDataEnded
            }.resume()
        }
    
    func queryIssueData(
        with query: [String: String],
        completion: @escaping (Result<IssueFrameHolder, Error>) -> Void) {
        guard var urlComponents = URLComponents(string: baseUrlString) else {
            logger.log("queryIssueData : URLComponents 생성 실패")
            return
        }
            
        var query = query
        query["cntPage"] = "\(self.cntPage)"
            
        let queryItems = query.map { URLQueryItem(name: $0.key, value: $0.value) }
        urlComponents.queryItems = queryItems
        guard let url = urlComponents.url else {
            logger.log("queryIssueData : URL 생성 실패")
            return
        }
        let request = URLRequest(url: url, timeoutInterval: 30.0)
        self.networkingState = .fetchingDataInProgress
        URLSession.shared.dataTask(with: request) { (data, _, error) in
            if let error = error {
                completion(.failure(error))
            }
            
            if let data = data {
                do {
                    let issueFrames = try self.issueDataDecoder.decodeIssueData(data)
                    self.cntPage += 1
                    completion(.success(issueFrames))
                } catch let decodeError {
                    completion(.failure(decodeError))
                }
            }
            self.networkingState = .fetchingDataEnded
        }.resume()
    }
    
    func fetchAdditionalInformation(
        completion: @escaping (Result<AdditionalInformation, Error>) -> Void) {
            guard let request = urlRequestFactory.makeUrlRequest(additionalInfoUrlString) else {
                logger.log("Making URLRequest is failed")
                return
            }
            networkingState = .fetchingDataInProgress
            URLSession.shared.dataTask(with: request) { (data, _, error) in
                if let error = error {
                    completion(.failure(error))
                }
                
                if let data = data {
                    do {
                        let additionalInfo = try self.additionalInformationDecoder.decodeIssueData(data)
                        completion(.success(additionalInfo))
                    } catch let decodeError {
                        completion(.failure(decodeError))
                    }
                }
                self.networkingState = .fetchingDataEnded
            }.resume()
        }

    func postIssue(with issue: PostIssueFormat) {
        let urlString = Server.additionalInfo.rawValue
        guard var request = urlRequestFactory.makeUrlRequest(urlString) else {
            logger.log("Making URLRequest is failed")
            return
        }
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        guard let data = issueDataEncoder.encodeIssueDatum(with: issue) else { return }
        let jsonData = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? Data ?? nil
        
        request.httpBody = data
        
        networkingState = .fetchingDataInProgress
        URLSession.shared.dataTask(with: request) { (_, response, error) in
            if let response = response {
                print("response : \(response)")
            }
            
            if let error = error {
                print("error : \(error)")
            }
            self.networkingState = .fetchingDataEnded
        }.resume()
    }
}

enum NetworkingState {
    case fetchingDataInProgress
    case fetchingDataEnded
}
