//
//  IssueData.swift
//  Issue-tracker
//
//  Created by leehwajin on 2023/05/25.
//

import Foundation

protocol APIData{
    
}

struct IssueList {
    struct IssueData: Codable {
        let issues: [Issue]
    }
    
    struct Label: Codable {
        let title: String?
        let bgColorCode: String?
    }
    
    struct Count {
        let label, milestone, opened, closed: Int?
    }
    
    struct Issue: Codable, APIData {
        let id: Int?
        let title, description, createAt: String?
        let labels: [Label]
        let milestone, author: String?
        let authorURL: String?
    }
}
struct LabelList {
    struct LabelData: Codable {
        let labels: [Label]
    }
    
    struct Label: APIData, Codable {
        let id: Int?
        let title, labelDescription, bgColorCode, fontColorCode: String?
    }
}

struct AssigneeList {
    struct AssigneeData: Codable {
        let assignees: [Assignee]
    }

    struct Assignee: APIData, Codable {
        let id: Int?
        let name: String?
        let imgURL: String?
    }
}

struct MilestoneList {
    struct MilesoneData: Codable {
        let milestones: [Milestone]
    }

    struct Milestone: Codable, APIData {
        let id: Int?
        let title, milestoneDescription, dueDate: String?
        let openedIssue, closedIssue: Int?
    }
}

struct WriterList {
    struct WriterData: Codable {
        let writers: [Writer]
    }
    
    struct Writer: Codable, APIData {
        let id: Int?
        let name: String?
        let imgURL: String?
    }
}
