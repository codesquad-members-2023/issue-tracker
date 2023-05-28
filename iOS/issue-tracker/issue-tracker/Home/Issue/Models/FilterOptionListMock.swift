//
//  FilterOptionListMock.swift
//  issue-tracker
//
//  Created by 에디 on 2023/05/24.
//

import Foundation

class FilterOptionListMock: FilterOptionsLike {
    var list: [[FilterOption]] = [
        [
            FilterOption(filterLabel: "열린 이슈", filterUrlStr: "state=true"),
            FilterOption(filterLabel: "내가 작성한 이슈", filterUrlStr: nil),
            FilterOption(filterLabel: "내가 댓글을 남긴 이슈", filterUrlStr: nil),
            FilterOption(filterLabel: "닫힌 이슈", filterUrlStr: "state=false"),
        ],
        [
            // 현재 assignee의 id로 필터링 가능, 중첩 사용은 안됌
            FilterOption(filterLabel: "ghkdgus29", filterUrlStr: "assignee=ghkdgus29"),
            FilterOption(filterLabel: "cire", filterUrlStr: "assignee=cire"),
        ],
        [
            FilterOption(filterLabel: "레이블 없음", filterUrlStr: nil),
            FilterOption(filterLabel: "BE STEP1", filterUrlStr: nil),
        ]
    ]
    
    func collectSelectedFilterOptionUrlString() -> String {
        // 필터 적용 형태 : 기본 URL + ?key1=value1&key2=value2
        // labelNames의 경우 : 기본 URL + ?라벨이름키=라벨1,라벨2
        var collectedOptionUrlString = "?"
        
        var urlString = ""
        for index in 0...1 {
            for option in list[index] {
                guard let urlStr = option.filterUrlStr else { continue }
                collectedOptionUrlString += option.isSelected ? urlStr + "&" : ""
            }
        }
        _ = urlString.popLast()
        
        var labelUrlString = ""
        for option in list[2] {
            guard let urlStr = option.filterUrlStr else { continue }
            collectedOptionUrlString += option.isSelected ? urlStr + "," : ""
        }
        _ = labelUrlString.popLast()
        
        collectedOptionUrlString += urlString
        collectedOptionUrlString += labelUrlString
        
        return collectedOptionUrlString.count == 1 ? "" : collectedOptionUrlString
    }
}
