//
//  AddIssueTableViewCell.swift
//  issue-tracker
//
//  Created by 에디 on 2023/06/01.
//

import UIKit

class AddIssueTableViewCell: UITableViewCell {
    static let identifier = "AddIssueTableViewCell"
    @IBOutlet weak var additionalInfoType: UILabel!
    @IBOutlet weak var additionalInfoName: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
    func configure(type: String, name: String) {
        additionalInfoType.text = type
        additionalInfoName.text = name
        additionalInfoType.font = UIFont.systemFont(ofSize: 20.0, weight: .regular)
        additionalInfoName.font = UIFont.systemFont(ofSize: 18.0, weight: .bold)
    }
    
}
