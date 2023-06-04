//
//  LabelTabViewController.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/29.
//

import UIKit

class LabelTabViewController: UIViewController {
    private var addButton: UIBarButtonItem!
    private var collectionView: LabelTabCollectionView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setAddButton()
        setCollectionView()
    }
    
    private func setAddButton() {
        addButton = UIBarButtonItem(title: "추가  ", style: .plain, target: self, action: #selector(addButtonTouched))
        self.navigationItem.rightBarButtonItem = addButton
    }
    
    @objc private func addButtonTouched() {
        
    }
    
    private func setCollectionView() {
           collectionView = LabelTabCollectionView(frame: CGRect(), collectionViewLayout: UICollectionViewFlowLayout())
           self.view.addSubview(collectionView)
           
           collectionView.translatesAutoresizingMaskIntoConstraints = false
           
           NSLayoutConstraint.activate([
               collectionView.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor),
               collectionView.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor),
               collectionView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
               collectionView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor)
           ])
       }

}
