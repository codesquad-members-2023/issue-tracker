//
//  IssueCell.swift
//  Issue-tracker
//
//  Created by 김하림 on 2023/05/11.
//

import UIKit

class IssueCell: UICollectionViewCell {
    static let identifier = "IssueCell"
    
    var titleLabel: UILabel = {
        let lbl = UILabel()
        lbl.font = UIFont.semiBoldL
        lbl.textColor = UIColor.neutralTextStrong
        lbl.text = "제목"
        return lbl
    }()
    
    var descriptionLabel: UILabel = {
        let lbl = UILabel()
        lbl.numberOfLines = 2
        lbl.font = UIFont.mediumM
        lbl.textColor = UIColor.neutralText
        lbl.text = "설명(최대 두 줄까지 보여줄 수 있다)"
        return lbl
    }()

    var milestones: UILabel = {
        let lbl = UILabel()
        lbl.font = UIFont.mediumM
        lbl.textColor = UIColor.neutralText
        return lbl
    }()
    
    var detailLabel: UILabel = {
        let lbl = UILabel()
        lbl.font = UIFont.mediumM
        lbl.textColor = UIColor.neutralTextWeak
        lbl.text = "〉"
        return lbl
    }()
    
    var tagLabelStackView: UIStackView = {
        let stackView = UIStackView()
        stackView.translatesAutoresizingMaskIntoConstraints = false
        stackView.axis = .horizontal
        stackView.alignment = .fill
        stackView.distribution = .equalSpacing
        stackView.spacing = 4
        return stackView
    }()
    
    let stackView: UIStackView = {
        let stackView = UIStackView()
        stackView.translatesAutoresizingMaskIntoConstraints = false
        stackView.axis = .vertical
        stackView.alignment = .fill
        stackView.distribution = .fill
        stackView.spacing = 4
        return stackView
    }()
    
    func makeLabel(labels: [Label]) {
        for label in labels {
            var tagLabel: UILabel = {
                let tags = PaddingLabel(withInsets: 4, 4, 16, 16)
                tags.font = UIFont.mediumS
                tags.text = label.title
            
                //컬러 관련
                if let color = UIColor(hex: label.bgColorCode ?? "FFFFFF") {
                    tags.backgroundColor = color
                } else {
                    tags.backgroundColor = UIColor.black
                }
                
                tags.textColor = UIColor.accentTextStrong
                let long = 355
                let short = 18
                tags.layer.masksToBounds = true
                tags.layer.cornerRadius = CGFloat(long*short/long/2)
                
                return tags
            }()
            tagLabelStackView.addArrangedSubview(tagLabel)
        }
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        [titleLabel, descriptionLabel, milestones].forEach {
            stackView.addArrangedSubview($0)
        }
        
        [tagLabelStackView, stackView, detailLabel].forEach {
            $0.translatesAutoresizingMaskIntoConstraints = false
            addSubview($0)
        }
        
        NSLayoutConstraint.activate([
            stackView.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 24),
            stackView.topAnchor.constraint(equalTo: self.topAnchor, constant: 16),
            stackView.widthAnchor.constraint(equalToConstant: 335),
            
            tagLabelStackView.topAnchor.constraint(equalTo: stackView.bottomAnchor, constant: 4),
            tagLabelStackView.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 24),
            tagLabelStackView.heightAnchor.constraint(equalToConstant: 24),
            
            detailLabel.topAnchor.constraint(equalTo: stackView.topAnchor, constant: 0),
            detailLabel.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -16),
            detailLabel.heightAnchor.constraint(equalToConstant: 30),
            detailLabel.widthAnchor.constraint(equalToConstant: 30)
        ])
    }
    
    required init?(coder: NSCoder) {
        fatalError("ERROR")
    }
}
