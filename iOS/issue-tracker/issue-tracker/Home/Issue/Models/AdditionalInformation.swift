//
//  AdditionalInfomation.swift
//  issue-tracker
//
//  Created by SONG on 2023/06/01.
//

import Foundation

struct AdditionalInformation: Codable {
    subscript(index: Int) -> [Codable] {
        switch index {
        case 0:
            return allUsers
        case 1:
            return allLabels
        case 2:
            return allMilestones
        default:
            return [Codable]()
        }
    }
    let allLabels: [Label]
    let allMilestones: [Milestone]
    let allUsers: [User]
}
