//
//  Images.swift
//  IssueTracker
//
//  Created by ilim on 2023/05/12.
//

import UIKit

enum Images: String {
    case exclamation = "Exclamation"
    case logotypeMedium = "LogotypeMedium"
    case milestone = "Milestone"
    case profileLarge = "ProfileLarge"
    case profileSmall = "ProfileSmall"
    case smile = "Smile"
    case tag = "Tag"
}

extension Images {
    static func imageMapper(from images: Images) -> UIImage? {
        return UIImage(named: images.rawValue)
    }
}
