//
//  IssueFrame.swift
//  issue-tracker
//
//  Created by 에디 on 2023/05/18.
//

import Foundation

struct IssueFrame: Codable {
    let title: String
    let contents: String
    let milestone: String
    let labels: [Label]
    let state: Bool
    let author: String
}
