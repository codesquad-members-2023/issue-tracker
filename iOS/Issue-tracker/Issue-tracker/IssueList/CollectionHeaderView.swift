//
//  CollectionHeaderView.swift
//  Issue-tracker
//
//  Created by leehwajin on 2023/05/11.
//
protocol CustomViewDelegate: AnyObject {
    func buttonTapped()
}


import UIKit

class CollectionHeaderView: UICollectionReusableView, UISearchBarDelegate {
    weak var delegate: CustomViewDelegate?
    static let identifier = "IssueHeader"
    
    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "이슈"
        label.font = UIFont.semiBoldXXL
        label.textColor = .neutralTextStrong
        return label
    }()
    
    private let searchBar: UISearchBar = {
        let searchBar = UISearchBar()
        return searchBar
    }()
    
    private let filterButton: UIButton = {
        let filterButton = UIButton()
        filterButton.setTitle("필터", for: .normal)
        filterButton.setTitleColor(.accentTextPrimary, for: .normal)
        filterButton.titleLabel?.font = UIFont.regularM
        filterButton.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
        return filterButton
    }()
    
    private let choiceButton: UIButton = {
        let choiceButton = UIButton()
        choiceButton.setTitle("선택", for: .normal)
        choiceButton.setTitleColor(.accentTextPrimary, for: .normal)
        choiceButton.titleLabel?.font = UIFont.regularM
        return choiceButton
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)

        [titleLabel, filterButton, choiceButton, searchBar].forEach {
            addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
        
        searchBar.delegate = self
        addSubview(searchBar)
        searchBar.translatesAutoresizingMaskIntoConstraints = false
        
        layout()
    }
    
    func layout() {
        setFilterButtonConstraint()
        setChioceButtonConstraint()
        setTitleLabelConstraint()
        searchBarConstraint()
        self.backgroundColor = UIColor.neutralBackground
    }
    func setFilterButtonConstraint() {
        NSLayoutConstraint.activate([
            filterButton.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 16),
            filterButton.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -325),
            filterButton.topAnchor.constraint(equalTo: self.topAnchor, constant: 0),
            filterButton.heightAnchor.constraint(equalToConstant: 32)
        ])
    }
    
    func setChioceButtonConstraint() {
        NSLayoutConstraint.activate([
            choiceButton.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 325),
            choiceButton.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -16),
            choiceButton.topAnchor.constraint(equalTo: self.topAnchor, constant: 0),
            choiceButton.heightAnchor.constraint(equalToConstant: 32)
        ])
    }
    
    func setTitleLabelConstraint() {
        NSLayoutConstraint.activate([
            titleLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 16),
            titleLabel.bottomAnchor.constraint(equalTo: searchBar.topAnchor, constant: 0),
            titleLabel.heightAnchor.constraint(equalToConstant: 48),
            titleLabel.widthAnchor.constraint(equalToConstant: 59)
        ])
    }
    
    func searchBarConstraint() {
        NSLayoutConstraint.activate([
            searchBar.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 16),
            searchBar.heightAnchor.constraint(equalToConstant: 48),
            searchBar.bottomAnchor.constraint(equalTo: self.bottomAnchor, constant: 0),
            searchBar.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -16)
        ])
    }
    
    
    
    @objc private func buttonTapped() {
        delegate?.buttonTapped()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
