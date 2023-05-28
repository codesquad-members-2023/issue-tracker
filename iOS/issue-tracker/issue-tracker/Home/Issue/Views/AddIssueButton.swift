//
//  AddIssueButton.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/24.
//

import UIKit

class AddIssueButton: UIButton {
    private var radius: CGFloat? = nil
    init(radius: CGFloat) {
        super.init(frame: .zero)
        self.radius = radius
        setFigure()
    
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setFigure()
    }

    
    private func setFigure() {
        guard let radius = radius else {
            return
        }
        self.layer.cornerRadius = radius/2
        self.backgroundColor = .tintColor
        self.setTitle("+", for: .normal)
        self.setTitleColor(.white, for: .normal)
        self.titleLabel?.textAlignment = .center
        self.titleLabel?.font = .systemFont(ofSize: radius/2, weight: .light)
    }
}
