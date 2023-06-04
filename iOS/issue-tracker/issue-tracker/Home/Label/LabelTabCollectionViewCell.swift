//
//  LabelTabCollectionViewCell.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/30.
//

import UIKit
import SwipeCellKit

class LabelTabCollectionViewCell: SwipeCollectionViewCell {
    static let identifier = "LabelTabCollectionViewCell"
    private let hoizontalProportion: CGFloat = 24 / 375
    private let verticalProportion: CGFloat = 16 / 84
    private let labelSlot = UIView()
    private var descriptionView = UILabel()
    
    var labelData: Label? {
        didSet {
            updateCell()
        }
    }
    
    override func layoutSubviews() { 
        super.layoutSubviews()
        setDescriptionView(descriptionView.text ?? "")
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setLabelSlot()
        labelData = nil
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setLabelSlot()
        labelData = nil
    }
    
    func setDescriptionView(_ text: String) {
        self.contentView.addSubview(descriptionView)
        descriptionView.text = text
        descriptionView.font = UIFont.systemFont(ofSize: round(labelSlot.frame.height * 0.5))
        descriptionView.textColor = .gray
        descriptionView.textAlignment = .left
        descriptionView.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate(
            [
                descriptionView.leadingAnchor.constraint(equalTo: self.contentView.leadingAnchor, constant: round(self.contentView.frame.width * hoizontalProportion)),
                descriptionView.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: round(-self.contentView.frame.width * hoizontalProportion)),
                descriptionView.topAnchor.constraint(equalTo: labelSlot.bottomAnchor),
                descriptionView.heightAnchor.constraint(equalToConstant: round(self.contentView.frame.height * 0.33))
            ]
        )
    }
    
    private func updateCell() {
        labelSlot.subviews.forEach { $0.removeFromSuperview() }
        
        if let labelData = labelData {
            let badge = BadgeLabel(label: labelData)
            
            if let description = labelData.description {
                labelSlot.addSubview(badge)
                descriptionView.text = description
            } else {
                labelSlot.addSubview(badge)
            }
            reconstraintsBadge(badge)
        }
    }
    
    private func setLabelSlot() {
        
        self.contentView.addSubview(labelSlot)
        labelSlot.backgroundColor = UIColor.white
        labelSlot.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate(
            [
                labelSlot.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: round(self.contentView.frame.width * hoizontalProportion)),
                labelSlot.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: round(-self.contentView.frame.width * hoizontalProportion)),
                labelSlot.topAnchor.constraint(equalTo: self.topAnchor, constant: round(self.contentView.frame.height * verticalProportion)),
                labelSlot.heightAnchor.constraint(equalToConstant: self.contentView.frame.height * 0.33)
            ]
        )
    }
    private func reconstraintsBadge(_ badge: BadgeLabel) {
        badge.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate(
            [
                badge.leadingAnchor.constraint(equalTo: labelSlot.leadingAnchor),
            ]
        )
    }
}
