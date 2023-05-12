//
//  ImageMapper.swift
//  IssueTracker
//
//  Created by ilim on 2023/05/12.
//

import UIKit

enum ImageMapper: String {
    case exclamation = "Exclamation"
    case logotypeMedium = "LogotypeMedium"
    case milestone = "Milestone"
    case profileLarge = "ProfileLarge"
    case profileSmall = "ProfileSmall"
    case smile = "Smile"
    case tag = "Tag"
}

extension ImageMapper {
    func match() -> UIImage? {
        return UIImage(named: self.rawValue)
    }
}
