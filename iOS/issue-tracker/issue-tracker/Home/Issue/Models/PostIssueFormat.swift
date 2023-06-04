//
//  PostIssueFormat.swift
//  issue-tracker
//
//  Created by 에디 on 2023/06/02.
//

import Foundation

struct PostIssueFormat: Encodable {
    var userId: Int?
    var title: String?
    var contents: String?
    var assignees: [String] = []
    var labelNames: [String] = []
    #warning("milestone만 안올라가는 중..")
    var milestoneName: String?
}
