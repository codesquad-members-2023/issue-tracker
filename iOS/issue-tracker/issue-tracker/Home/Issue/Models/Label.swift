//
//  Label.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/18.
//

import Foundation

struct Label: Codable {
    let name: String
    let description: String?
    let textColor: String
    let backgroundColor: String
    let id: String
    let new: Bool
}
