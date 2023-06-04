//
//  FilterOption.swift
//  issue-tracker
//
//  Created by 에디 on 2023/05/23.
//

import Foundation

struct FilterOption {
    let filterLabel: String
    let filterUrlStr: (String, String)?
    var isSelected: Bool
    
    init(filterLabel: String, filterUrlStr: (String, String)? = nil, isSelected: Bool = false) {
        self.filterLabel = filterLabel
        self.filterUrlStr = filterUrlStr
        self.isSelected = isSelected
    }
}
