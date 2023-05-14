//
//  CollectionReusableView.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/11.
//

import UIKit

class IssueCollectionViewHeaderCell: UICollectionReusableView {
    static let identifier = "Header"

    @IBOutlet var title: UILabel!
    
    @IBOutlet var searchBar: UISearchBar!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        setTitle()
        setSearchBar()
    }
    
    func setTitle() {
        title.font = UIFont.systemFont(ofSize: safeAreaLayoutGuide.owningView!.frame.height * 0.35, weight: .bold)
    }
    
    func setSearchBar() {

    }
    
}
