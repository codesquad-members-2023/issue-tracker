//
//  Badge.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/15.
//

import UIKit

class BadgeLabel: UILabel {

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    init(label: Label) {
        super.init(frame: .zero)
        configure(with: label)
    }
    
    func configure(with label: Label) {
        self.text = label.name
        setBackgroundColor(label.backgroundColor)
        let textColor = hexToUIColor(hex: label.textColor)
        self.textColor = textColor
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        guard let superview = self.superview else {
            return
        }
        self.clipsToBounds = true
        self.layer.cornerRadius = 15
        self.font = UIFont.systemFont(ofSize: round(superview.frame.height / 2.6), weight: .regular)
        self.textAlignment = .center
        let font = self.font
        let text = self.text ?? ""
        let attributes = [NSAttributedString.Key.font: font]
        let textSize = (text as NSString).size(withAttributes: attributes as [NSAttributedString.Key: Any])
        let textWidth = ceil(textSize.width)
        

        self.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            self.widthAnchor.constraint(equalToConstant: textWidth + superview.frame.height),
            self.bottomAnchor.constraint(equalTo: superview.bottomAnchor),
            self.centerYAnchor.constraint(equalTo: superview.centerYAnchor)
        ])
    }
    
    private func setFontColor(_ hex: String) {
        let uiColor = hexToUIColor(hex: hex)
        
    }
    
    private func setBackgroundColor(_ hex: String) {
        let uiColor = hexToUIColor(hex: hex)
        self.backgroundColor = uiColor
    }
    
    private func hexToUIColor(hex: String) -> UIColor {
        // #FFFFFF 와 같은 형태를 받는다고 가정
        let strArr = Array(hex)
        let red: Int = Int(String(strArr[1...2]), radix: 16) ?? 0
        let green: Int = Int(String(strArr[3...4]), radix: 16) ?? 0
        let blue: Int = Int(String(strArr[5...6]), radix: 16) ?? 0
        
        return UIColor(red: CGFloat(red)/255.0, green: CGFloat(green)/255.0, blue: CGFloat(blue)/255.0, alpha: 1.0)
    }
}
