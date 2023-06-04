//
//  LabelTabCollectionViewHeaderCell.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/30.
//

import UIKit

class LabelTabCollectionViewHeaderCell: UICollectionReusableView {
    static let identifier = "LabelTabCollectionViewHeaderCell"
    
    private var title = UILabel()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setTitle()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setTitle()
    }
    
    private func setTitle() {
        title.text = "레이블"
        title.font = UIFont.systemFont(ofSize: safeAreaLayoutGuide.owningView!.frame.height * 0.7, weight: .bold)
        self.addSubview(title)
        
        title.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            title.topAnchor.constraint(equalTo: self.topAnchor),
            title.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: self.frame.width * 14 / 343),
            title.trailingAnchor.constraint(equalTo: self.trailingAnchor),
            title.heightAnchor.constraint(equalToConstant: self.frame.height)
        ])
    }
    
}
