//
//  Issue.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/18.
//

import Foundation

struct Issue {
    let title: Title
    let contents: Contents
    let milestone: Milestone
    let labels: [Label]
    var state: State
    let author: Author
}
