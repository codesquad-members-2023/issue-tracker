//
//  ViewController.swift
//  Issue-tracker
//
//  Created by leehwajin on 2023/05/19.
//

import UIKit

protocol UploadData: AnyObject {
    func uploadIssue(url: String)
}

class FilterTableViewController: UIViewController, CustomNavigationDelegate {
    weak var delegate: UploadData?
    
    private let networkManager = NetworkManager.shared
    private let customView = CustomNavigationFilter()
    private let tableView = UITableView()
    
    private let sectionKind = ["상태", "담당자", "레이블", "마일스톤", "작성자"]
    private let status = ["열린 이슈", "닫힌 이슈"]
    private var assigneeArray: [APIData] = []
    private var labelArray: [APIData] = []
    private var milestoneArray: [APIData] = []
    private var writerArray: [APIData] = []
    
    private let filterListCellIdentifier = "filterListCell"
    private let filterListHeaderIdentifier = "filterListHeader"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
        tableView.delegate = self
        customView.delegate = self
       
        customViewLayout()
        tableViewLayout()
        setupData()
        
    }
    
    func customViewLayout() {
        
        view.addSubview(customView)
        
        customView.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            customView.topAnchor.constraint(equalTo: self.view.topAnchor, constant: 0),
            customView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor, constant: 0),
            customView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor, constant: 0),
            customView.heightAnchor.constraint(equalToConstant: 70)
        ])
    }
    
    func tableViewLayout() {
        tableView.rowHeight = 44
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: self.filterListCellIdentifier)
        tableView.register(UITableViewHeaderFooterView.self, forHeaderFooterViewReuseIdentifier: self.filterListHeaderIdentifier)
        
        self.view.addSubview(tableView)
        tableView.backgroundColor = UIColor(red: 0.95, green: 0.95, blue: 0.97, alpha: 1.0)
        tableView.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: customView.bottomAnchor, constant: 0),
            tableView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor, constant: 0),
            tableView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor, constant: 0),
            tableView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor, constant: 0)
        ])
    }
    
    func setupData() {
        let group = DispatchGroup()
        group.enter()
        networkManager.performRequest(searchTerm: PrivateURL.label) { result in
            switch result {
            case .success(let labelData):
                self.labelArray = labelData
            case .failure(let error):
                print(error.localizedDescription)
            }
            group.leave()
        }
        
        group.enter()
        networkManager.performRequest(searchTerm: PrivateURL.allAssignee) { result in
            switch result {
            case .success(let assigneeData):
                self.assigneeArray = assigneeData
            case .failure(let error):
                print(error.localizedDescription)
            }
            group.leave()
        }
        
        group.enter()
        networkManager.performRequest(searchTerm: PrivateURL.milestone) { result in
            switch result {
            case .success(let milestoneData):
                self.milestoneArray = milestoneData
            case .failure(let error):
                print(error.localizedDescription)
            }
            group.leave()
        }
        
        group.enter()
        networkManager.performRequest(searchTerm: PrivateURL.writer) { result in
            switch result {
            case .success(let writerData):
                self.writerArray = writerData
            case .failure(let error):
                print(error.localizedDescription)
            }
            group.leave()
        }
        
        group.notify(queue: .main) {
            self.tableView.reloadData()
        }
    }
    
    
    func cancelButtonTapped() {
        self.dismiss(animated: true)
    }
    
    func saveButtonTapped() {
//        api수정되면 주석처리된 코드로 해야함
//        var issueUrl = PrivateURL.issue
        //현재코드는 임의로 오픈클로즈이슈 아무것도 선택하지 않았을때 open이슈대상으로 보여주는코드
        var issueUrl = PrivateURL.openIssue
        var assigneeUrl = ""
        var labelUrl = ""
        var milestoneUrl = ""
        var writeUrl = ""
        var selectedRows: [IndexPath] = []
           
           for section in 0..<sectionKind.count {
               let rows = tableView.numberOfRows(inSection: section)
               for row in 0..<rows {
                   let indexPath = IndexPath(row: row, section: section)
                   if let cell = tableView.cellForRow(at: indexPath), cell.tintColor == .accentTextPrimary {
                       selectedRows.append(indexPath)
                   }
               }
           }

        
        for item in selectedRows {
            switch item.first {
            case 0:
                if item.last == 0 {
                    issueUrl = PrivateURL.openIssue
                }else {
                    issueUrl = PrivateURL.closedIssue
                }
            case 1:
                assigneeUrl = "&assignees=\((item.last ?? 0) + 1)"
            case 2:
                labelUrl = "&labels=\((item.last ?? 0) + 1)"
            case 3:
                milestoneUrl = "&milestones=\((item.last ?? 0) + 1)"
            case 4:
                writeUrl = "&writers=\((item.last ?? 0) + 1)"
            default:
                break
            }
        }
        dismiss(animated: true)
        delegate?.uploadIssue(url: issueUrl + assigneeUrl + labelUrl + milestoneUrl + writeUrl)
    }
}

extension FilterTableViewController: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return sectionKind.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        switch section {
        case 0:
            return status.count
        case 1:
            return assigneeArray.count
        case 2:
            return labelArray.count
        case 3:
            return milestoneArray.count
        case 4:
            return writerArray.count
            
        default:
            return 0
        }
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: self.filterListCellIdentifier, for: indexPath)
        
        cell.selectionStyle = UITableViewCell.SelectionStyle.none
        
        switch indexPath.section {
        case 0:
            cell.textLabel?.text = status[indexPath.row]
        case 1:
            cell.textLabel?.text = (assigneeArray as? [AssigneeList.Assignee])?[indexPath.row].name
        case 2:
            cell.textLabel?.text = (labelArray as? [LabelList.Label])?[indexPath.row].title
        case 3:
            cell.textLabel?.text = (milestoneArray as? [MilestoneList.Milestone])?[indexPath.row].title
        case 4:
            cell.textLabel?.text = (writerArray as? [WriterList.Writer])?[indexPath.row].name
        default:
            break
        }
        
        cell.accessoryType = .checkmark
        cell.tintColor = .neutralTextWeak
        
        return cell
    }
    
}
extension FilterTableViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let headerView = UIView()
        
        let label: UILabel = {
            let label = UILabel()
            label.font = UIFont.semiBoldM
            label.textColor = UIColor.neutralText
            label.text = sectionKind[section]
            headerView.addSubview(label)
            return label
        }()
        headerView.backgroundColor = .white
        label.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            label.centerYAnchor.constraint(equalTo: headerView.centerYAnchor),
            label.leadingAnchor.constraint(equalTo: headerView.leadingAnchor, constant: 16)
        ])
        
        return headerView
    }
    
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 44
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let cell = tableView.cellForRow(at: indexPath)
        // 토글형식
        if cell?.tintColor == .accentTextPrimary{
            cell?.tintColor = .neutralTextWeak
        }else{
            cell?.tintColor = .accentTextPrimary
        }
        // 섹션마다 단일선택
        let section = indexPath.section
        let rows = tableView.numberOfRows(inSection: section)
        
        for row in 0..<rows {
            if let currentCell = tableView.cellForRow(at: IndexPath(row: row, section: section)) {
                if currentCell != cell && currentCell.tintColor == .accentTextPrimary {
                    currentCell.tintColor = .neutralTextWeak
                }
            }
        }
        //클릭하기 쉽도록 스크롤 컨트롤
        tableView.selectRow(at: indexPath, animated: true, scrollPosition: .middle)
    }
}
