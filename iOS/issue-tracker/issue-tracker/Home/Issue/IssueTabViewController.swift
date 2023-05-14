//
//  IssueTabViewController.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/09.
//

import UIKit

class IssueTabViewController: UIViewController {
    let collectionView = IssueCollectionView(frame: .zero, collectionViewLayout: UICollectionViewFlowLayout())
    @IBOutlet var backPlane: UIView!
    override func viewDidLoad() {
        super.viewDidLoad()
        backPlane.addSubview(collectionView)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let navigationController = segue.destination as? UINavigationController{
            let filterTableViewController = navigationController.topViewController as? IssueFilterTableViewController
        }
    }
}
