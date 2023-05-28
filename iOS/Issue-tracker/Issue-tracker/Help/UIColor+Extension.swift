//
//  UIColor + Extension.swift
//  Issue-tracker
//
//  Created by leehwajin on 2023/05/15.
//

import UIKit

extension UIColor {
    static let neutralTextWeak = UIColor(named: "gray700")
    static let neutralText = UIColor(named: "gray800")
    static let neutralTextStrong = UIColor(named: "gray900")
    static let neutralBackground = UIColor(named: "gray50")
    static let neutralBackgroundStrong = UIColor(named: "gray100")
    static let neutralBackgroundDisabled = UIColor(named: "gray400")
    static let neutralBorder = UIColor(named: "gray100")
    static let netralBoorderStrong = UIColor(named: "gray200")
    static let accentTextStrong = UIColor(named: "gray50")
    static let accentTextPrimary = UIColor(named: "blue")
    static let accentTextSecondary = UIColor(named: "purple")
    static let accentBackgroundStrong = UIColor(named: "gray900")
    static let accentBackgroundStrongPrimary = UIColor(named: "blue")
    static let accentBackgroundStrongSecondary = UIColor(named: "purple")
    static let dangerText = UIColor(named: "red")
    static let dangerTextStrong = UIColor(named: "red")
    static let dangerBackgroundStrong = UIColor(named: "red")
}

extension UIColor {
    // 16진수를 스트링으로 받아왔을때 색상으로 변환해주는 init
    convenience init?(hex: String) {
        var hexString = hex.uppercased()

        if hexString.hasPrefix("#") {
            hexString.remove(at: hexString.startIndex)
        }

        guard hexString.count == 6 else {
            return nil
        }

        var rgbValue: UInt64 = 0
        Scanner(string: hexString).scanHexInt64(&rgbValue)

        let red = CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0
        let green = CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0
        let blue = CGFloat(rgbValue & 0x0000FF) / 255.0

        self.init(red: red, green: green, blue: blue, alpha: 1.0)
    }
}
