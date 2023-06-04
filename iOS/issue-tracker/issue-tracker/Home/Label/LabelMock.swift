//
//  File.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/31.
//

import Foundation

struct LabelsMock {
    static var mockList: [Label] = [
        Label(name: "feature", description: "기능을 만들었슴둥", textColor: "#004DE3", backgroundColor: "#EDF1D6", id: "feature", new: true),
        Label(name: "fix", description: "버그를 고쳤음", textColor: "#654321", backgroundColor: "#609966", id: "fix", new: true)
    ]
    
}
