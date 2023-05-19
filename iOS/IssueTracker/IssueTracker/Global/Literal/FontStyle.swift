//
//  FontStyle.swift
//  IssueTracker
//
//  Created by Noah on 2023/05/12.
//

import UIKit.UIFont

enum FontStyle {
    static let body: UIFont = .systemFont(ofSize: FontSize.medium.size, weight: .regular)
    static let bodyMedium: UIFont = .systemFont(ofSize: FontSize.medium.size, weight: .bold)
    static let title: UIFont = .systemFont(ofSize: FontSize.large.size, weight: .bold)
    static let titleMedium: UIFont = .systemFont(ofSize: FontSize.xLarge.size, weight: .regular)
    static let titleStrong: UIFont = .systemFont(ofSize: FontSize.doubleXLarge.size, weight: .regular)
    static let button: UIFont = .systemFont(ofSize: FontSize.medium.size, weight: .bold)
    static let buttonWeak: UIFont = .systemFont(ofSize: FontSize.small.size, weight: .bold)
    static let buttonStrong: UIFont = .systemFont(ofSize: FontSize.large.size, weight: .bold)
    static let placeHolder: UIFont = .systemFont(ofSize: FontSize.medium.size, weight: .bold)
    static let caption: UIFont = .systemFont(ofSize: FontSize.small.size, weight: .bold)
    static let label: UIFont = .systemFont(ofSize: FontSize.small.size, weight: .bold)
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
