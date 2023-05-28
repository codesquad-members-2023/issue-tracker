//
//  IssueData.swift
//  Issue-tracker
//
//  Created by leehwajin on 2023/05/25.
//

import Foundation

struct IssueData: Codable {
    let issues: [Issue]
}

struct Label: Codable {
    let title: String?
    let bgColorCode: String?
}

struct Issue: Codable {
    let title: String?
    let labels: [Label]
    let milestone: String?
}
