//
//  FontStyle.swift
//  IssueTracker
//
//  Created by Noah on 2023/05/12.
//

import UIKit.UIFont

enum FontStyle {
    static let body: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.doubleXLarge.size, weight: .regular),
        lineHeight: FontSize.doubleXLarge.lineHeight
    )
    static let bodyMedium: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.medium.size, weight: .bold),
        lineHeight: FontSize.medium.lineHeight
    )
    static let title: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.large.size, weight: .bold),
        lineHeight: FontSize.large.lineHeight
    )
    static let titleMedium: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.xLarge.size, weight: .regular),
        lineHeight: FontSize.xLarge.lineHeight
    )
    static let titleStrong: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.doubleXLarge.size, weight: .regular),
        lineHeight: FontSize.doubleXLarge.lineHeight
    )
    static let button: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.medium.size, weight: .bold),
        lineHeight: FontSize.medium.lineHeight
    )
    static let buttonWeak: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.small.size, weight: .bold),
        lineHeight: FontSize.small.lineHeight
    )
    static let buttonStrong: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.large.size, weight: .bold),
        lineHeight: FontSize.large.lineHeight
    )
    static let placeHolder: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.medium.size, weight: .bold),
        lineHeight: FontSize.medium.lineHeight
    )
    static let caption: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.small.size, weight: .bold),
        lineHeight: FontSize.small.lineHeight
    )
    static let label: FontTypeFace = .init(
        font: .systemFont(ofSize: FontSize.small.size, weight: .bold),
        lineHeight: FontSize.small.lineHeight
    )
}

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
