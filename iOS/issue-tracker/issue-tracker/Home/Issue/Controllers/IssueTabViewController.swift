//
//  IssueTabViewController.swift
//  issue-tracker
//
//  Created by SONG on 2023/05/09.
//

import UIKit
import OSLog

class IssueTabViewController: UIViewController, IssueCollectionViewDelegate, IssueTabViewControllerLike, NetworkManagerIncluded {
    
    private var isSelectionMode: Bool = false
    private var addIssueButton: AddIssueButton?
    private var toolBar: IssueSelectingToolbar?
    @IBOutlet var filterButton: UIBarButtonItem!
    @IBOutlet var selectButton: UIBarButtonItem!
    @IBOutlet var collectionView: IssueCollectionView!
    var cancelButton: UIBarButtonItem?
    let nothingButton = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)
    var filterOptionList: FilterOptionsLike = FilterOptionListMock()
    var additionalInformation: AdditionalInformation?
    
    
    private let logger = Logger()
    let networkManager = NetworkManager()
    var issueFrames: [IssueFrame]?
    private var currentIssueDataUrlString: String = Server.base.rawValue
    
    @IBOutlet var backPlane: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        collectionView.collectionViewDelegate = self
        setCancelButton()
        setToolbar()
        setAddIssueButton()
        configureAddButtonAction()
        fetchAdditionalInformation()
    }
    
    
    func didSelectCell(in collectionView: IssueCollectionView, at indexPath: IndexPath) {
        if isSelectionMode == true {
            guard let cell = collectionView.cellForItem(at: indexPath) as? IssueCollectionViewCell else {
                return
            }
            guard let toolBar = self.toolBar else {
                return
            }
            
            cell.isCheckmarked.toggle()
            let isPlus = cell.isCheckmarked
            toolBar.updateTitle(isPlus: isPlus)
            cell.subIconView.change(isCheckmarked: isPlus)
            cell.updateSubIconViewConstraints()
        }
    }
    
    private func resetCellSelection() {
        for indexPath in collectionView.indexPathsForVisibleItems {
            guard let cell = collectionView.cellForItem(at: indexPath) as? IssueCollectionViewCell else {
                continue
            }
            cell.isCheckmarked = false
            cell.subIconView.change(isCheckmarked: false)
            cell.updateSubIconViewConstraints()
        }
        self.toolBar?.resetTitle()
    }
    
    private func updateTopTitle() {
        guard let header = collectionView.supplementaryView(forElementKind: UICollectionView.elementKindSectionHeader, at: IndexPath(item: 0, section: 0)) as? IssueCollectionViewHeaderCell else {
            return
        }
        
        if isSelectionMode {
            header.title.text = "이슈선택"
        } else {
            header.title.text = "이슈"
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        collectionView.issueFrames = []
        networkManager.cntPage = 1
        collectionView.reloadData()
        fetchData()
    }
    
    private func setAddIssueButton() {
        addIssueButton = AddIssueButton(radius: self.view.frame.height * 56 / 666)
        guard let addIssueButton = addIssueButton else {
            return
        }
        self.view.addSubview(addIssueButton)
        setIssueAddButtonConstraints(button: addIssueButton)
    }
    
    private func setIssueAddButtonConstraints(button: UIButton) {
        
        let length = self.view.frame.height * 56 / 666
        button.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            button.heightAnchor.constraint(equalToConstant: length),
            button.widthAnchor.constraint(equalToConstant: length),
            button.bottomAnchor.constraint(equalTo: self.view.bottomAnchor, constant: -length*1.5),
            button.trailingAnchor.constraint(equalTo: self.collectionView.trailingAnchor, constant: -length/2)
        ])
    }
    
    private func calculateToolBarFrame() -> CGRect {
        guard let tabBar = self.tabBarController?.tabBar else {
            return CGRect()
        }
        let frame = CGRect(origin: tabBar.frame.origin, size: CGSize(width: tabBar.frame.width, height: tabBar.frame.height/1.6))
        return frame
    }
    
    private func setToolbar() {
        self.toolBar = IssueSelectingToolbar(frame: calculateToolBarFrame())
        guard let toolBar = self.toolBar else {
            return
        }
        self.view.addSubview(toolBar)
    }
    
    private func setCancelButton() {
        cancelButton = UIBarButtonItem(title: "취소  ", style: .plain, target: self, action: #selector(cancelButtonTouched))
    }
    
    @IBAction func filterButtonTouched(_ sender: UIButton) {
        let filterTableViewController = IssueFilterTableViewController()
        filterTableViewController.delegate = self
        filterTableViewController.filterOptionList = filterOptionList
        
        show(filterTableViewController, sender: sender)
    }
    
    @IBAction func selectButtonTouched(_ sender: UIButton) {
        self.toolBar?.isHidden = false
        self.tabBarController?.tabBar.isHidden = true
        self.navigationItem.leftBarButtonItem = nothingButton
        self.navigationItem.rightBarButtonItem = cancelButton
        self.addIssueButton?.isHidden = true
        self.isSelectionMode.toggle()
        self.updateTopTitle()
    }
    
    @objc private func cancelButtonTouched() {
        self.toolBar?.isHidden = true
        self.tabBarController?.tabBar.isHidden = false
        self.navigationItem.leftBarButtonItem = filterButton
        self.navigationItem.rightBarButtonItem = selectButton
        self.addIssueButton?.isHidden = false
        self.isSelectionMode.toggle()
        self.resetCellSelection()
        self.updateTopTitle()
    }
    
    internal func fetchData() {
        let queryDictionary: [String: String] = filterOptionList.getQueryDictionary()
        networkManager.queryIssueData(with: queryDictionary) { result in
            switch result {
            case .success(let issueFrameHolder):
                self.issueFrames = issueFrameHolder.issues
                guard let issueFrames = self.issueFrames else { return }
                self.collectionView.issueFrames.append(contentsOf: issueFrames)
                DispatchQueue.main.async {
                    self.collectionView.reloadData()
                }
            case .failure(let error):
//                self.logger.error("error : \(error)")
                print("error: \(error)")
            }
        }
    }
    
    private func fetchAdditionalInformation() {
        networkManager.fetchAdditionalInformation { result in
            switch result {
            case .success(let additionalInfo):
                self.additionalInformation = additionalInfo
                self.makeFilterOptionsArray()
            case .failure(let error):
                self.networkManager.logger.log("network ERROR : \(error)")
            }
        }
    }
    
    private func makeFilterOptionsArray() {
        let filterOptionFactory = FilterOptionFactory()
        let users = additionalInformation?.allUsers
        let labels = additionalInformation?.allLabels
        let milestones = additionalInformation?.allMilestones
        
        let usersFilterOptions: [FilterOption] = users?.map { user in  filterOptionFactory.makeFilterOption(outOf: user) } ?? []
        let labelsFilterOptions: [FilterOption] = labels?.map { label in
            filterOptionFactory.makeFilterOption(outOf: label) } ?? []
        let milestoneFilterOptions: [FilterOption] = milestones?.map { milestone in
            filterOptionFactory.makeFilterOption(outOf: milestone) } ?? []
        
        filterOptionList.list.append(usersFilterOptions)
        filterOptionList.list.append(labelsFilterOptions)
        filterOptionList.list.append(milestoneFilterOptions)
    }
    
    func setUrlString(with urlString: String) {
        currentIssueDataUrlString = urlString
    }
    
    private func configureAddButtonAction() {
        addIssueButton?.addTarget(self, action: #selector(addButtonTouched), for: .touchUpInside)
    }
    
    @objc private func addButtonTouched() {
        let storyboard = UIStoryboard(name: "HomeStoryboard", bundle: nil)
        let addIssueViewController = storyboard.instantiateViewController(withIdentifier: "타락파워전사")
        show(addIssueViewController, sender: self.addIssueButton)
    }
}

protocol IssueCollectionViewDelegate: AnyObject, NetworkManagerIncluded {
    func didSelectCell(in collectionView: IssueCollectionView, at indexPath: IndexPath)
    func fetchData()
}

protocol NetworkManagerIncluded {
    var networkManager: NetworkManager { get }
}
