//
//  PrivateURL.swift
//  Issue-tracker
//
//  Created by leehwajin on 2023/05/28.
//

import Foundation

struct PrivateURL {
    static let url = "http://3.37.70.64:8888/api"
    static let issue = "/issues"
    static let openIssue = "/issues?isOpen=true"
    static let closedIssue = "/issues?isOpen=false"
    static let allAssignee = "/assignees"
    static let label = "/labels"
    static let milestone = "/milestones?isOpen=true"
    static let writer = "/writers"
}
