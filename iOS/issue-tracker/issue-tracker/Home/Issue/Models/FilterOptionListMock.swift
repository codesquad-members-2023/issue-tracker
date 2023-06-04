//
//  FilterOptionListMock.swift
//  issue-tracker
//
//  Created by 에디 on 2023/05/24.
//

import Foundation

struct FilterOptionListMock: FilterOptionsLike {
    var list: [[FilterOption]] = [
        [
            FilterOption(filterLabel: "열린 이슈", filterUrlStr: ("state", "true")),
            FilterOption(filterLabel: "내가 작성한 이슈"),
            FilterOption(filterLabel: "내가 댓글을 남긴 이슈"),
            FilterOption(filterLabel: "닫힌 이슈", filterUrlStr: ("state", "false")),
        ],
        // 이하 내용 network로 추가
//        [
//            // 현재 assignee의 id로 필터링 가능, 중첩 사용은 안됌
//            FilterOption(filterLabel: "ghkdgus29", filterUrlStr: ("assignees", "ghkdgus29")),
//            FilterOption(filterLabel: "cire", filterUrlStr: ("assignees", "cire")),
//        ],
//        [
//            FilterOption(filterLabel: "레이블 없음", filterUrlStr: ("labelNames", "$none")),
//            FilterOption(filterLabel: "BE STEP1", filterUrlStr: ("milestoneName", "BE STEP1")),
//        ]
    ]
    
    func getQueryDictionary() -> [String: String] {
        var result: [String: String] = [:]
        
        for filterOptionArray in list {
            for filterOption in filterOptionArray {
                if filterOption.isSelected == true && filterOption.filterUrlStr != nil {
                    guard let key = filterOption.filterUrlStr?.0 else { continue }
                    guard var value = filterOption.filterUrlStr?.1 else { continue }
                    // 임시 : assignee의 경우 이미 값이 있으면 ghkdgus29,cire와 같은 값이 필요
                    if let oldValue = result[key] { value = oldValue + "," + value }
                        result[key] = value
                }
            }
        }
        return result
    }
}

protocol FilterOptionsLike {
    var list: [[FilterOption]] { get set }
    
    func getQueryDictionary() -> [String: String]
}
