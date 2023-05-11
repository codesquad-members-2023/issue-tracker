//
//  FontStyle.swift
//  IssueTracker
//
//  Created by Noah on 2023/05/12.
//

import UIKit.UIFont

enum FontStyle {
extension FontStyle {
    struct FontTypeFace {
        let font: UIFont
        let lineHeight: CGFloat
    }
}

private extension FontStyle {
    enum FontSize {
        static let doubleXLarge: FontDimension = .init(size: 32, lineHeight: 48)
        static let xLarge: FontDimension = .init(size: 24, lineHeight: 40)
        static let large: FontDimension = .init(size: 18, lineHeight: 32)
        static let medium: FontDimension = .init(size: 15, lineHeight: 24)
        static let small: FontDimension = .init(size: 12, lineHeight: 16)
    }
}

private extension FontStyle {
    struct FontDimension {
        let size: CGFloat
        let lineHeight: CGFloat
    }
}
