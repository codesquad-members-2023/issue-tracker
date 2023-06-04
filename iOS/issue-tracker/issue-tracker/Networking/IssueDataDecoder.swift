//
//  IssueDataDecoder.swift
//  issue-tracker
//
//  Created by 에디 on 2023/05/30.
//

import Foundation

class IssueDataDecoder: IssueDataDecodable {
    func decodeIssueData(_ data: Data) throws -> IssueFrameHolder {
        try JSONDecoder().decode(IssueFrameHolder.self, from: data)
    }
}

protocol IssueDataDecodable {
    func decodeIssueData(_: Data) throws -> IssueFrameHolder
}

class AdditionalInformationDataDecoder: AdditionalInformationDataDecodable {
    func decodeIssueData(_ data: Data) throws -> AdditionalInformation {
        try JSONDecoder().decode(AdditionalInformation.self, from: data)
    }
}

protocol AdditionalInformationDataDecodable {
    func decodeIssueData(_: Data) throws -> AdditionalInformation
}
