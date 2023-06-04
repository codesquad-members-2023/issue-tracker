//
//  IssueDataEncoder.swift
//  issue-tracker
//
//  Created by 에디 on 2023/06/02.
//

import Foundation

class IssueDataEncoder: IssueDataEncodable {
    private let encoder = JSONEncoder()
    
    func encodeIssueDatum(with issue: PostIssueFormat) -> Data? {
        encoder.outputFormatting = .prettyPrinted
        do {
            return try encoder.encode(issue)
        } catch {
            print("error : \(error)")
            return nil
        }
    }
}

protocol IssueDataEncodable {
    func encodeIssueDatum(with issue: PostIssueFormat) -> Data?
}
