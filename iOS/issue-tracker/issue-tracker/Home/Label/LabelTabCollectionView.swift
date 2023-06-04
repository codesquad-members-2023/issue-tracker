//
//  LabelTabTableView.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/30.
//

import UIKit
import SwipeCellKit

class LabelTabCollectionView: UICollectionView {
    static let identifier = "LabelTabCollectionView"

    override init(frame: CGRect, collectionViewLayout layout: UICollectionViewLayout) {
        super.init(frame: frame, collectionViewLayout: layout)
        self.delegate = self
        self.dataSource = self
        registerCell()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.delegate = self
        self.dataSource = self
        registerCell()
    }
    
    private func registerCell() {
        self.register(LabelTabCollectionViewCell.self, forCellWithReuseIdentifier: LabelTabCollectionViewCell.identifier)
        self.register(LabelTabCollectionViewHeaderCell.self, forSupplementaryViewOfKind: UICollectionView.elementKindSectionHeader, withReuseIdentifier: LabelTabCollectionViewHeaderCell.identifier)
    }
}

extension LabelTabCollectionView: UICollectionViewDelegate {
    
}

extension LabelTabCollectionView: UICollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return LabelsMock.mockList.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: LabelTabCollectionViewCell.identifier, for: indexPath) as? LabelTabCollectionViewCell else {
            return UICollectionViewCell()
        }
        let labelMock = LabelsMock.mockList[indexPath.item]
        cell.labelData = labelMock
        
        
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        switch kind {
        case UICollectionView.elementKindSectionHeader:
            guard let header = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: LabelTabCollectionViewHeaderCell.identifier, for: indexPath) as? LabelTabCollectionViewHeaderCell else {
                return UICollectionReusableView()
            }
            header.backgroundColor = .white
            return header
        default:
            return UICollectionReusableView()
        }
    }
}

extension LabelTabCollectionView: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        UIEdgeInsets(top: .zero, left: .zero, bottom: .zero, right: .zero)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let width = collectionView.frame.width
        let height = width / 4
        return CGSize(width: width, height: height)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, referenceSizeForHeaderInSection section: Int) -> CGSize {
        let width = self.frame.width
        let height = width / 7
        
        return CGSize(width: width, height: height)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 1.0
    }
}
