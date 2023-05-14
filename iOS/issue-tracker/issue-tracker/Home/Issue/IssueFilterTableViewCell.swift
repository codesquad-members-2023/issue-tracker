//
//  TableViewCellTest.swift
//  issue-tracker
//
//  Created by 에디 on 2023/05/10.
//

import UIKit

class IssueFilterTableViewCell: UITableViewCell {

    @IBOutlet var filterOptionLabel: UILabel!
    @IBOutlet var checkmarkView: UIImageView!
    let config = UIImage.SymbolConfiguration(pointSize: 14)
    var isOptionSelected = false
    lazy var tintCheckmarkImage = UIImage(systemName: "checkmark", withConfiguration: config)
    lazy var grayCheckmarkImage = tintCheckmarkImage?.withTintColor(.gray, renderingMode: .alwaysOriginal)
    
    override func awakeFromNib() {
        super.awakeFromNib()
        configureAsNotChecked()
    }

    func configureAsNotChecked() {
        checkmarkView.image = grayCheckmarkImage
    }
    
    func configureAsChecked() {
        checkmarkView.image = tintCheckmarkImage
    }
    
    func setOptionName(with optionName : String) {
        self.filterOptionLabel.text = optionName
    }
    
    func toggleCheckmarkColor() {
        isOptionSelected = !isOptionSelected
        if isOptionSelected {
            checkmarkView.image = tintCheckmarkImage
        } else {
            checkmarkView.image = grayCheckmarkImage
        }
    }
    
}

