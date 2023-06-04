//
//  AddIssueViewController.swift
//  issue-tracker
//
//  Created by 에디 on 2023/06/01.
//

import UIKit

class AddIssueViewController: UIViewController {
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var titleInputField: UITextField!
    @IBOutlet weak var contentsInput: UITextView!
    var issue: PostIssueFormat = PostIssueFormat()
    
    private let networkManager = NetworkManager()
    private var additionalInfo: AdditionalInformation?
    var additionalInfocellLabels : [(String,String)] = [
        ("담당자", ""),
        ("레이블", ""),
        ("마일스톤", "")
    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        tableView.delegate = self
        tableView.dataSource = self
        registerCell()
        setTitleInputLabelLayout()
        fetchData()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        tableView.reloadData()
    }
    
    @IBAction func saveButtonTouched(_ sender: Any) {
        issue.title = titleInputField.text ?? "no title input"
        issue.contents = contentsInput.text
        networkManager.postIssue(with: issue)
        navigationController?.popViewController(animated: true)
    }
    
    private func fetchData() {
        networkManager.fetchAdditionalInformation { result in
            switch result {
            case .success(let additionalInfo):
                self.additionalInfo = additionalInfo
            case .failure(let error):
                self.networkManager.logger.log("network ERROR")
            }
        }
    }
    
    private func configureNavigationBar() {
        
    }
    
    private func setTitleInputLabelLayout() {
        titleInputField.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate(
            [
                titleInputField.leadingAnchor.constraint(equalTo: titleLabel.trailingAnchor, constant: 50.0)
        ])
        
        titleInputField.font = UIFont.systemFont(ofSize: 18.0)
        titleInputField.textColor = .gray
    }

    private func registerCell() {
        tableView.register(UINib(nibName: "AddIssueTableViewCell", bundle: nil), forCellReuseIdentifier: AddIssueTableViewCell.identifier)
    }
}

extension AddIssueViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        3
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: AddIssueTableViewCell.identifier, for: indexPath) as? AddIssueTableViewCell else {
            return UITableViewCell()
        }
        
        let type = additionalInfocellLabels[indexPath.row].0
        let name = additionalInfocellLabels[indexPath.row].1
        
        switch indexPath.row {
        case 0:
            cell.configure(type: type, name: name)
        case 1:
            cell.configure(type: type, name: name)
        case 2:
            cell.configure(type: type, name: name)
        default:
            return UITableViewCell()
        }
        return cell
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        switch section {
        case 0: return "추가 정보"
        default: return ""
        }
    }
}

extension AddIssueViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let storyboard = UIStoryboard(name: "HomeStoryboard", bundle: nil)
        guard let additionalInfoTableViewController = storyboard.instantiateViewController(withIdentifier: "김삿갓") as? AddtionalInfoTableViewController else {
            return
        }
        guard let additionalInfo = additionalInfo else {
            return
        }
        additionalInfoTableViewController.delegate = self
        additionalInfoTableViewController.configure(with: additionalInfo[indexPath.row])
        
        show(additionalInfoTableViewController, sender: self)
    }
}

