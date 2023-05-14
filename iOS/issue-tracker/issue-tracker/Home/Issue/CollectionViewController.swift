//
//  CollectionViewController.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/10.
//

import UIKit

class CollectionViewController: UICollectionViewController {
    private let cellIdentifier = "Cell"
    private let headerIdentifier = "Header"
    override func viewDidLoad() {
        super.viewDidLoad()
        self.collectionView!.register(UICollectionViewCell.self, forCellWithReuseIdentifier: cellIdentifier)
    }
    override func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }

    override func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 2
    }

    override func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: cellIdentifier, for: indexPath)
        return cell
    }
}
