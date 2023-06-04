//
//  FilterOptionFactory.swift
//  issue-tracker
//
//  Created by 에디 on 2023/06/02.
//

import Foundation

class FilterOptionFactory {
    func makeFilterOption(outOf user: User) -> FilterOption {
        FilterOption(filterLabel: user.id, filterUrlStr: ("assignees", user.id))
    }
    
    func makeFilterOption(outOf milestone: Milestone) -> FilterOption {
        FilterOption(filterLabel: milestone.name, filterUrlStr: ("milestoneName", milestone.name))
    }
    
    func makeFilterOption(outOf label: Label) -> FilterOption {
        FilterOption(filterLabel: label.id, filterUrlStr: ("labelNames", label.id))
    }
}
