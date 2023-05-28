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
    var filterOption: FilterOption?
    var isOptionSelected = false {
        willSet {
            togglableImageView.image = newValue ? selectedImage : deselectedImage
        }
    }
    var selectedImage: UIImage?
    var deselectedImage: UIImage?
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    func configureWith(filterOption: FilterOption, selectedImage: UIImage?, deselectedImage: UIImage?) {
        filterOptionLabel.text = filterOption.filterLabel
        self.selectedImage = selectedImage
        self.deselectedImage = deselectedImage
        isOptionSelected = filterOption.isSelected
    }
    
    func toggleSelecting() {
        isOptionSelected.toggle()
    }
}
