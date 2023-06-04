//
//  TableViewCellTest.swift
//  issue-tracker
//
//  Created by 에디 on 2023/05/10.
//

import UIKit

class IssueFilterTableViewCell: UITableViewCell {
    @IBOutlet var filterOptionLabel: UILabel!
    @IBOutlet var togglableImageView: UIImageView!
    private var filterOption: FilterOption?
    private let checkmarkImage = UIImage(systemName: "checkmark")
    private let grayCheckmarkImage = UIImage(systemName: "checkmark")?.withTintColor(.gray, renderingMode: .alwaysOriginal)
    
    func configureWith(filterOption: FilterOption) {
        self.filterOption = filterOption
        filterOptionLabel.text = filterOption.filterLabel
        updateCheckmark()
    }
    
    func toggleSelecting() {
        filterOption?.isSelected.toggle()
        updateCheckmark()
    }
    
    private func updateCheckmark() {
        guard let filterOption = self.filterOption else { return }
        togglableImageView.image = filterOption.isSelected ? checkmarkImage : grayCheckmarkImage
    }
}
