//
//  IssueFilterTableViewController.swift
//  issue-tracker
//
//  Created by 에디 on 2023/05/10.
//

import UIKit

class IssueFilterTableViewController: UITableViewController {
    var filterOptionList: FilterOptionsLike?
//    weak var delegate: IssueTabViewControllerLike?
    weak var delegate: IssueTabViewController?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let filterOptionCellNib: UINib = UINib(nibName: "IssueFilterTableViewCell", bundle: nil)
        tableView.register(filterOptionCellNib, forCellReuseIdentifier: "filterOptionCell")
        
        configureBackButton()
        configureSaveButton()
        configureTitle()
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return filterOptionList?.list.count ?? 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return filterOptionList?.list[section].count ?? 1
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "filterOptionCell", for: indexPath) as? IssueFilterTableViewCell else { return UITableViewCell() }
        guard let filterOption = filterOptionList?.list[indexPath.section][indexPath.row] else { return UITableViewCell() }
        cell.configureWith(filterOption: filterOption)
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        if let cell = tableView.cellForRow(at: indexPath) as? IssueFilterTableViewCell {
            filterOptionList?.list[indexPath.section][indexPath.row].isSelected.toggle()
            cell.toggleSelecting()
        }
    }
    
    override func tableView(_ tableView: UITableView, titleForHeaderInSection
                            section: Int) -> String? {
        switch section {
        case 0: return "상태"
        case 1: return "담당자"
        case 2: return "레이블"
        case 3: return "마일스톤"
        default: return "Header \(section)"
        }
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        let num = round(tableView.frame.height * 44 / 811)
        
        return num
    }
    
    private func dismissSelf() {
        navigationController?.popViewController(animated: true)
    }
}

protocol IssueTabViewControllerLike: AnyObject, NetworkManagerIncluded {
    var filterOptionList: FilterOptionsLike { get set }
    var issueFrames: [IssueFrame]? { get set }
}

// 취소, 저장 버튼
extension IssueFilterTableViewController {
    private func configureBackButton() {
        let backbutton = UIButton(type: .custom)
        backbutton.setImage(UIImage(systemName: "chevron.left"), for: .normal)
        backbutton.setTitle("취소", for: .normal)
        backbutton.setTitleColor(backbutton.tintColor, for: .normal)
        backbutton.addTarget(self, action: #selector(backAction), for: .touchUpInside)
        
        navigationItem.leftBarButtonItem = UIBarButtonItem(customView: backbutton)
    }
    
    private func configureSaveButton() {
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "저장  ", style: .plain, target: self, action: #selector(saveAction))
    }
    
    private func configureTitle() {
        navigationItem.title = "필터"
    }
    @objc func backAction() {
        dismissSelf()
    }
    
    @objc func saveAction() {
        if let savedFilterOptionList = self.filterOptionList {
            delegate?.filterOptionList = savedFilterOptionList
            delegate?.issueFrames = []
        }
        dismissSelf()
    }
}
